import { arrangeProducts } from './positioning';
import { compareProducts } from './sizing';

// usage calculations(appWidth, appHeight).compareProduct(product, item)
export const calculations = (sceneWidth, sceneHeight) => {
    return {
        compareProducts: (product, item) => {
            let sizes = compareProducts(sceneWidth, sceneHeight, product, item);
            let positions = arrangeProducts(sceneWidth, sceneHeight, sizes.product, sizes.item);
            return {
                product: { size: sizes.product, position: positions.product },
                item: { size: sizes.item, position: positions.item }
            };
        }
    };
};