import { ITEM_MARGIN_TOP, ITEM_MARGIN_LEFT } from '../../constants/ui';
import { distanceBetweenPoints } from '../utils';

const padding = {
    relative: 0.05,
    minimalInPx: 20
};

const projectionSizePx = (p) => distanceBetweenPoints(
    p.imgWidth * (p.pointA.x - p.pointB.x),
    p.imgHeight * (p.pointA.y - p.pointB.y)
);
const projectionPxPerMm = (p) => projectionSizePx(p) / p.size;
const getProjectionDimensions = (p) => {
    const pxPerMm = projectionPxPerMm(p);
    return {
        widthMm: p.imgWidth / pxPerMm,
        heightMm: p.imgHeight / pxPerMm
    };
};

export const compareProducts = (sceneWidth, sceneHeight, product, item) => {
    //calculat available canvas size
    let scenePadding = Math.min(sceneWidth, sceneHeight) * padding.relative;
    scenePadding = scenePadding < padding.minimalInPx ? padding.minimalInPx : scenePadding;
    let availableSceneWidth = sceneWidth - scenePadding * 2 - ITEM_MARGIN_LEFT * 4,
        availableSceneHeight = sceneHeight - scenePadding * 2 - ITEM_MARGIN_TOP * 2;
    // get current projections
    let productProjection = product.projections.filter((p) => p.active)[0];
    let itemProjection = item.projections.filter((p) => p.active)[0];
    // calculate sizes in mm
    let productDimensions = getProjectionDimensions(productProjection);
    let itemDimensions = getProjectionDimensions(itemProjection);
    // calculate optimal pxPerMm
    let wPxPerMm = availableSceneWidth / (productDimensions.widthMm + itemDimensions.widthMm);
    let hPxPerMm = availableSceneHeight / Math.max(productDimensions.heightMm, itemDimensions.heightMm);
    let pxPerMm = Math.min(wPxPerMm, hPxPerMm);
    // calculate sizes
    return {
        product: {
            width: Math.round(productDimensions.widthMm * pxPerMm),
            height: Math.round(productDimensions.heightMm * pxPerMm)
        },
        item: {
            width: Math.round(itemDimensions.widthMm * pxPerMm),
            height: Math.round(itemDimensions.heightMm * pxPerMm)
        }
    };
};