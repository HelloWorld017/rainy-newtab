const FileSystem = {
	async encodeImage(canvas) {
		const dataUrl = canvas.toDataURL('image/webp');

		return {
			dataUrl,
			digest: this.bufferToHex(await crypto.subtle.digest('sha-1', this.stringToBuffer(dataUrl)))
		};
	},

	stringToBuffer(str) {
		const buf = new ArrayBuffer(str.length * 2);
		const bufView = new Uint16Array(buf);
		for (let i = 0, strLen = str.length; i < strLen; i++) {
			bufView[i] = str.charCodeAt(i);
		}
		return buf;
	},

	bufferToHex(buf) {
		const bufView = new Uint8Array(buf);
		const hex = '0123456789abcdef';
		let str = '';

		for(let i = 0; i < bufView.length; i++) {
			const v = bufView[i];
			str += hex[v >> 4] + hex[v & 15];
		}

		return str;
	},

	dataUrlToBuffer(dataUrl) {
		const byteString = atob(dataUrl.split(',')[1]);
		const buffer = new ArrayBuffer(byteString.length);
		const imageArray = new Uint8Array(buffer);

		for (let i = 0; i < byteString.length; i++) {
			imageArray[i] = byteString.charCodeAt(i);
		}

		return imageArray;
	},

	dataUrlToBlob(dataUrl) {
		return new Blob([this.dataUrlToBuffer(dataUrl)], {type: 'image/webp'});
	},

	drawImage(image, targetWidth, targetHeight) {
		const canvas = document.createElement('canvas');
		canvas.width = targetWidth;
		canvas.height = targetHeight;

		const ctx = canvas.getContext('2d');
		ctx.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight);

		return canvas;
	},

	async addImage(image) {
		if(image.naturalWidth < 300 || image.naturalHeight < 200) throw new Error("Image is too small!");

		const canvas = this.resizeImage(
			image,
			image.naturalWidth,
			image.naturalHeight
		);

		const {digest, dataUrl} = await this.encodeImage(canvas);

		const thumbCanvas = this.resizeImage(image, 300, 200);
		const {dataUrl: thumbDataUrl} = await this.encodeImage(thumbCanvas);

		const keys = await this.keyImages();
		if(!keys.includes(digest)) {
			keys.push(digest);
		}

		await this.setRaw(`theme/image-${digest}`, dataUrl);
		await this.setRaw(`theme/thumb-${digest}`, thumbDataUrl);
		await this.keyImages(keys);
	},

	async getImage(hash, thumbnail = false) {
		return await this.getRaw(`theme/${thumbnail ? 'thumb' : 'image'}-${hash}`);
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

	bindFs(entries) {
		const computed = {};
		const methods = {};

		Object.entries(entries).forEach(([name, [key, defaultValue]]) => {
			if(defaultValue === undefined) defaultValue = null;

			computed[name] = () => FileSystem.getRaw(key, defaultValue);
			methods[`set${name[0].toUpperCase() + name.slice(1)}`] = value => FileSystem.setRaw(key, value);
		});

		return {computed, methods};
	},

	get isExtension() {
		return __EXTENSION__;
	}
};

export default FileSystem;
