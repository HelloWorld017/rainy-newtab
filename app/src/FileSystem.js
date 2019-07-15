const FileSystem = {
	encodeImage(canvas) {
		const dataUrl = canvas.toDataURL();
		const byteString = atob(dataUrl.split(',')[1]);
		const buffer = new ArrayBuffer(byteString.length);
		const imageArray = new Uint8Array(buffer);

		for (let i = 0; i < byteString.length; i++) {
			imageArray[i] = byteString.charCodeAt(i);
		}

		return {
			imageArray,
			digest: crypto.subtle.digest('sha-1', imageArray)
		};
	},

	async addImage(image) {
		if(image.naturalWidth < 300 || image.naturalHeight < 200) throw new Error("Image is too small!");

		const canvas = document.createElement('canvas');
		canvas.width = image.naturalWidth;
		canvas.height = image.naturalHeight;

		const ctx = canvas.getContext('2d');
		ctx.drawImage(image, 0, 0);

		const {digest, imageArray} = this.encodeImage(canvas);

		const thumbCanvas = document.createElement('canvas');
		thumbCanvas.width = 300;
		thumbCanvas.height = 200;

		const thumbCtx = thumbCanvas.getContext('2d');

		const resizeRate = Math.max(300 / image.naturalWidth, 200 / image.naturalHeight);
		const resizeWidth = image.naturalWidth * resizeRate;
		const resizeHeight = image.naturalHeight * resizeRate;

		if(resizeWidth === 300) {
			const y = (resizeHeight - 200) / 2
			thumbCtx.drawImage(image, 0, -y, resizeWidth, resizeHeight);
		} else {
			const x = (resizeWidth - 300) / 2
			thumbCtx.drawImage(image, -x, 0, resizeWidth, resizeHeight);
		}

		const {imageArray: thumbImageArray} = this.encodeImage(thumbCanvas);

		const keys = await this.keyImages();
		if(!keys.includes(digest)) {
			keys.push(digest);
		}

		await this.setRaw(`theme/image-${digest}`, imageArray);
		await this.setRaw(`theme/thumb-${digest}`, thumbImageArray);
		await this.keyImages(keys);
	},

	async getImage(hash, thumbnail = false) {
		const imageArray = await this.getRaw(`theme/${thumbnail ? 'thumb' : 'image'}-${hash}`);
		if(!imageArray) return null;

		return new Blob(imageArray, {type: 'image/png'});
	},

	async deleteImage(hash) {
		await this.deleteRaw(`theme/image-${hash}`);
		await this.deleteRaw(`theme/thumb-${hash}`);

		try {
			await this.deleteRaw(`theme/style-${hash}`);
		} catch(e) {}

		const keys = await this.keyImages();
		await this.keyImages(keys.filter(v => v !== hash));
	},

	async keyImages(newValue) {
		if(!this.isExtension) return [];

		if(Array.isArray(newValue)) {
			await this.setRaw('theme/keys', newValue);
			return newValue;
		}

		const keys = await this.getRaw('theme/keys', []);
		return keys;
	},

	getRaw(key, defaultValue = null) {
		if(!this.isExtension) return defaultValue;

		return new Promise((resolve, reject) => {
			chrome.storage.local.get(key, value => {
				if(!value && chrome.runtime.lastError) {
					return resolve(defaultValue);
				}

				const valueKey = value[key];
				resolve(valueKey === undefined ? defaultValue : valueKey);
			});
		});
	},

	setRaw(key, value) {
		if(!this.isExtension) return Promise.resolve();

		const setObject = {};
		setObject[key] = value;

		return new Promise((resolve, reject) => {
			chrome.storage.local.set(setObject, () => {
				if(chrome.runtime.lastError) {
					return reject(chrome.runtime.lastError);
				}

				resolve();
			});
		});
	},

	deleteRaw(key) {
		if(!this.isExtension) return Promise.resolve();

		return new Promise((resolve, reject) => {
			chrome.storage.local.remove(key, () => {
				if(chrome.runtime.lastError) {
					return reject(chrome.runtime.lastError);
				}

				resolve();
			});
		});
	},

	get isExtension() {
		return !!chrome.storage;
	}
};

export default FileSystem;
