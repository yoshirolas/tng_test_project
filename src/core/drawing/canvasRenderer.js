import * as helpers from './helpers';
import { loadImage } from '../images';

const
    getAlphaUrl = (url) => url.replace('.png', '_alpha.png'),
    getJpegUrl = (url) => url.replace('.png', '.jpg'),
    recalculateWidth = (canvasSize, origWidth, origHeight) => {
        return {
            ...canvasSize,
            width: Math.round(canvasSize.height  / (origHeight / origWidth))
        };
    },
    doubleCanvasSizesIfHiResDisplay = (canvasSize) => {
        if (helpers.isHighDensityScreen && !helpers.isFirefox) {
            canvasSize = {
                width: canvasSize.width * 2,
                height: canvasSize.height * 2
            };
        }
        return canvasSize;
    },
    setCanvasSize = (canvas, size) => {
        canvas.width = size.width;
        canvas.height = size.height;
    },
    createCanvas = (width, height) => {
        const tmpCanvas = document.createElement('canvas');
        setCanvasSize(tmpCanvas, { width, height });
        return tmpCanvas;
    },
    drawPngAndJpegOnCanvas = (canvas, alpha, img) => {
        let ctx = canvas.getContext('2d');
        ctx.globalCompositeOperation = 'source-over';
        ctx.drawImage(alpha, 0, 0, alpha.width, alpha.height);
        ctx.globalCompositeOperation = 'source-out';
        ctx.drawImage(img, 0, 0, img.width, img.height);
    },

    disableImageSmoothingInCanvas = (canvas, isImageSmoothingDisabled) => {
        if (isImageSmoothingDisabled) {
            if (typeof canvas.getContext('2d').imageSmoothingEnabled === 'boolean') {
                canvas.getContext('2d').imageSmoothingEnabled = false;
            }
            else if (typeof canvas.getContext('2d').mozImageSmoothingEnabled === 'boolean') {
                canvas.getContext('2d').mozImageSmoothingEnabled = false;
            }
            else if (typeof canvas.getContext('2d').msImageSmoothingEnabled === 'boolean') {
                canvas.getContext('2d').msImageSmoothingEnabled = false;
            }
        }
    },
    applyAntialiasing = (sourceCanvas, canvasSize, isImageSmoothingDisabled) => {
        let
            width = sourceCanvas.width >= 2 * canvasSize.width ? Math.round(sourceCanvas.width / 2) : canvasSize.width,
            height = sourceCanvas.height >= 2 * canvasSize.height ? Math.round(sourceCanvas.height / 2) : canvasSize.height;
        let tempCanvas = createCanvas(width, height);
        disableImageSmoothingInCanvas(tempCanvas, isImageSmoothingDisabled);
        tempCanvas.getContext('2d').drawImage(sourceCanvas, 0, 0, tempCanvas.width, tempCanvas.height);
        if(width > canvasSize.width && height > canvasSize.height) {
            return applyAntialiasing(tempCanvas, canvasSize, isImageSmoothingDisabled);
        }
        return tempCanvas;
    },
    getImageSrcWithAClosestSize = (src, canvasDownscalingImages, canvasSize) => {
        if (!Array.isArray(canvasDownscalingImages) || canvasDownscalingImages.length === 0) {
            return src;
        }
        let closestSizeSrc = src;
        let largerDimension = Math.max(canvasSize.width, canvasSize.height);
        let largerDimensionIndex = canvasSize.width > canvasSize.height ? 0 : 1;
        let closestSizes = canvasDownscalingImages
            .filter((imgSize) => (imgSize[largerDimensionIndex] - largerDimension) > 0)
            .map((imgSize) => {
                return {
                    ...imgSize,
                    distance: imgSize[largerDimensionIndex] - largerDimension
                };
            })
            .sort((imgSize1, imgSize2) => imgSize1.distance - imgSize2.distance);
        if (closestSizes.length > 0) {
            const closestWidth = closestSizes[0][0];
            const closestHeight = closestSizes[0][1];
            let jpgExt = `_${closestWidth}x${closestHeight}.jpg`;
            let alphaExt = `_${closestWidth}x${closestHeight}_alpha.png`;
            closestSizeSrc = src.replace('.jpg', jpgExt).replace('_alpha.png', alphaExt);
        }
        return closestSizeSrc;
    };

export const canvasRenderer = {
    draw: (canvas, imgUrl, canvasDownscalingImages = [], isImageSmoothingDisabled = false) => {
        //this variable introduced to keep `canvas.width/canvas.height` direct references minimal because they are costly
        let canvasSize = {
            width: canvas.clientWidth,
            height: canvas.clientHeight
        };
        // jpeg image
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        let ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
        const jpegUrl = getJpegUrl(imgUrl);
        const closestJpgImageUrl = getImageSrcWithAClosestSize(jpegUrl, canvasDownscalingImages, canvasSize);
        // mask image
        var alpha = new Image();
        alpha.crossOrigin = 'Anonymous';
        const alphaUrl = getAlphaUrl(imgUrl);
        const closestMaskImageUrl = getImageSrcWithAClosestSize(alphaUrl, canvasDownscalingImages, canvasSize);
        // load images and  draw canvas
        loadImage(img, closestJpgImageUrl)
            .then(() => {
                return loadImage(alpha, closestMaskImageUrl);
            })
            .then(() => {
                //modes like human doesn't have image width in px until image is loaded
                canvasSize = recalculateWidth(canvasSize, img.width, img.height);
                //update width if it was not set or setted wrong
                canvas.style.width = `${canvasSize.width}px`;
                canvasSize = doubleCanvasSizesIfHiResDisplay(canvasSize);
                setCanvasSize(canvas, canvasSize);
                var tmpCanvas = createCanvas(img.width, img.height);
                drawPngAndJpegOnCanvas(tmpCanvas, alpha, img);
                if (img.height > canvasSize.height || img.width > canvasSize.width) {
                    tmpCanvas = applyAntialiasing(tmpCanvas, canvasSize, isImageSmoothingDisabled);
                }
                //TODO: do this via state?
                canvas.style.background = 'none';
                ctx.drawImage(tmpCanvas, 0, 0, canvasSize.width, canvasSize.height);
            })
            .catch((err) => {
                throw new Error(err);
            });
    }
};