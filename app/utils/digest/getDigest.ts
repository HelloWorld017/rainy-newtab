const stringToBuffer = (string: string) => {
	const buffer = new ArrayBuffer(string.length * 2);
	const bufferView = new Uint16Array(buffer);
	for (let i = 0, strLen = string.length; i < strLen; i++) {
		bufferView[i] = string.charCodeAt(i);
	}

	return buffer;
};

const bufferToHex = (buffer: ArrayBuffer) => {
	const bufferView = new Uint8Array(buffer);
	const chars = '0123456789abcdef';
	let output = '';

	for (let i = 0; i < bufferView.length; i++) {
		const v = bufferView[i];
		output += chars[v >> 4] + chars[v & 15];
	}

	return output;
};

export const getDigest = async (payload: string) =>
	bufferToHex(await crypto.subtle.digest('sha-1', stringToBuffer(payload)));
