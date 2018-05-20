const IMAGE_NOT_FOUND = 'IMAGE_NOT_FOUND';
export const loadImage = (img, url) => new Promise((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () => reject(IMAGE_NOT_FOUND);
    img.src = url;
});