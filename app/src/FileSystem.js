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

	resizeImage(image, targetWidth, targetHeight) {
		const canvas = document.createElement('canvas');
		canvas.width = targetWidth;
		canvas.height = targetHeight;

		const ctx = canvas.getContext('2d');

		const resizeRate = Math.max(targetWidth / image.naturalWidth, targetHeight / image.naturalHeight);
		const resizeWidth = image.naturalWidth * resizeRate;
		const resizeHeight = image.naturalHeight * resizeRate;

		const x = (resizeWidth - targetWidth) / 2;
		const y = (resizeHeight - targetHeight) / 2;

		ctx.drawImage(image, -x, -y, resizeWidth, resizeHeight);

		return canvas;
	},

	async addImage(image) {
		if(image.naturalWidth < 300 || image.naturalHeight < 200) throw new Error("Image is too small!");

		let resizeEnabled = true;
		if(screen.availLeft !== 0 || screen.availTop !== 0) {
			resizeEnabled = prompt(`Will you resize the image to ${screen.availWidth}x${screen.availHeight}?\n` +
				'If you want to change target size, please drag chrome to another monitor.\n' +
				'If you don\'t want to resize, please click cancel.\n' +
				'Large image can slow down startup speed.');
		}

		const canvas = this.resizeImage(
			image,
			resizeEnabled ? screen.availWidth : image.naturalWidth,
			resizeEnabled ? screen.availHeight : image.naturalHeight
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

	get isExtension() {
		return !!chrome.storage;
	}
};

export default FileSystem;
