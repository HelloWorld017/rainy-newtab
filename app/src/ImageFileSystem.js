const ImageFileSystem = {
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
		const keys = await this.keys();
		if(!keys.includes(digest)) {
			keys.push(digest);
		}

		await this.setRaw(`image/image-${digest}`, imageArray);
		await this.keys(keys);
	},

	async getImage(hash) {
		const imageArray = await this.getRaw(`image/image-${hash}`);
		if(!imageArray) return null;

		return new Blob(imageArray, {type: 'image/png'});
	},

	async deleteImage(hash) {
		await this.deleteRaw(`image/image-${hash}`);
	},

	getRaw(key) {
		return new Promise((resolve, reject) => {
			chrome.storage.local.get(key, value => {
				if(!value && chrome.runtime.lastError) {
					return reject(chrome.runtime.lastError);
				}

				resolve(value[key]);
			});
		});
	},

	setRaw(key, value) {
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
		return new Promise((resolve, reject) => {
			chrome.storage.local.remove(key, () => {
				if(chrome.runtime.lastError) {
					return reject(chrome.runtime.lastError);
				}

				resolve();
			});
		});
	},

	async keys(newValue) {
		if(Array.isArray(newValue)) {
			await this.setRaw('image/keys', newValue);
			return newValue;
		}

		const keys = await this.getRaw('image/keys');
		if(keys === undefined) return await this.keys([]);

		return keys;
	}
};

export default ImageFileSystem;
