export const resizeImage = (image: HTMLImageElement, targetWidth: number, targetHeight: number) => {
	const canvas = document.createElement('canvas');
	canvas.width = targetWidth;
	canvas.height = targetHeight;

	const resizeRate = Math.max(
		targetWidth / image.naturalWidth,
		targetHeight / image.naturalHeight
	);
	const resizeWidth = image.naturalWidth * resizeRate;
	const resizeHeight = image.naturalHeight * resizeRate;

	const x = (resizeWidth - targetWidth) / 2;
	const y = (resizeHeight - targetHeight) / 2;

	const ctx = canvas.getContext('2d');
	ctx?.drawImage(image, -x, -y, resizeWidth, resizeHeight);

	return canvas;
};
