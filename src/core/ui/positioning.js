import { 
    MEASURE_HEIGHT
} from '../../constants/ui';

export const arrangeProducts = (sceneWidth, sceneHeight, productSize, itemSize) => {
    let
        productWidth = productSize.width + 2 * MEASURE_HEIGHT,
        productHeight = productSize.height + 2 * MEASURE_HEIGHT,
        itemWidth = itemSize.width + 2 * MEASURE_HEIGHT,
        itemHeight = itemSize.height + 2 * MEASURE_HEIGHT;
    let
        productTop = Math.round((sceneHeight / 2) - (productHeight / 2)),
        itemTop = Math.round((sceneHeight / 2) - (itemHeight / 2));
    //get items zone according to their sizes, bigger product receive more free space
    let freeSpace = sceneWidth - (productWidth + itemWidth);
    let
        productLeft = Math.round(freeSpace / 3),
        itemLeft = Math.round(freeSpace / 3 + productWidth + freeSpace / 3);

    return {
        product: { top: Math.max(productTop, 0), left: Math.max(productLeft, 0) },
        item: { top: Math.max(itemTop), left: Math.max(itemLeft) }
    };
};