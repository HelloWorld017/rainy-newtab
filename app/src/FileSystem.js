const FileSystem = {
	async addImage(image) {
		const canvas = document.createElement('canvas');
		canvas.width = image.naturalWidth;
		canvas.height = image.naturalHeight;

		const ctx = canvas.getContext('2d');
		ctx.drawImage(image, 0, 0);

		const dataUrl = canvas.toDataURL();
		const byteString = atob(dataUrl.split(',')[1]);
		const buffer = new ArrayBuffer(byteString.length);
		const imageArray = new Uint8Array(buffer);

		for (let i = 0; i < byteString.length; i++) {
			imageArray[i] = byteString.charCodeAt(i);
		}

		const digest = crypto.subtle.digest('sha-1', imageArray);
		const keys = await this.keyImages();
		if(!keys.includes(digest)) {
			keys.push(digest);
		}

		await this.setRaw(`theme/image-${digest}`, imageArray);
		await this.keyImages(keys);
	},

	async getImage(hash) {
		const imageArray = await this.getRaw(`theme/image-${hash}`);
		if(!imageArray) return null;

		return new Blob(imageArray, {type: 'image/png'});
	},

	async deleteImage(hash) {
		await this.deleteRaw(`theme/image-${hash}`);
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
