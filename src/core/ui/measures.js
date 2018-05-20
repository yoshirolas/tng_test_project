import { distanceBetweenPoints, mmToIn } from '../utils';
import { 
    ITEM_MARGIN_TOP,
    ITEM_MARGIN_LEFT,
    MEASURE_HEIGHT,
    MEASURE_HORIZONTAL_OFFSET,
    MEASURE_TEXT_SYMBOL_WIDTH,
    MEASURE_TEXT_PADDING,
    MEASURE_TEXT_OFFSET
} from '../../constants/ui';

const getTextWidth = (text) => text.length * MEASURE_TEXT_SYMBOL_WIDTH + MEASURE_TEXT_PADDING;
const getMeasureDimensions = (measureWidth, captionText, verticalMeasure) => {
    let textWidth = getTextWidth(captionText);
    if (measureWidth < textWidth) {
        return {
            arrowWidth: Math.round(measureWidth / 2),
            textOffsetX: Math.round((measureWidth - textWidth) / 2 + captionText.length * 1.5),
            textOffsetY: verticalMeasure ? -MEASURE_TEXT_OFFSET : MEASURE_TEXT_OFFSET
        };
    } 
    return {
        arrowWidth: Math.round((measureWidth - textWidth) / 2),
        textOffsetX: 0,
        textOffsetY: 0
    };
};

export const measures = (item, size) => {
    const projection = item.projections.filter((p) => p.active)[0];
    return projection.measures.map((measure) => {
        // calculate width
        let x1 = Math.max(measure.pointA.x, 0),
            y1 = measure.pointA.y,
            x2 = Math.max(measure.pointB.x, 0),
            y2 = measure.pointB.y;

        const 
            verticalMeasure = x1 <= 0.001 && x2 <= 0.001,
            horizontalMeasure = y1 >= 0.999 && y2 >= 0.999;

        x1 *= size.width;
        x2 *= size.width;
        y1 *= size.height;
        y2 *= size.height;
        const measureWidth = Math.max(
            Math.round(distanceBetweenPoints(x1 - x2, y1 - y2)),
            0
        );

        //setup text labels
        let text = {
            caption: `${mmToIn(measure.size)} in`
        };
        const { arrowWidth, textOffsetX, textOffsetY } = getMeasureDimensions(measureWidth, text.caption, verticalMeasure);
        text.top = `${textOffsetY}px`;
        text.left = `${textOffsetX}px`;
        text.width = textOffsetY === 0 && textOffsetX === 0 ? `${measureWidth}px` : 'auto';

        //rotation
        const 
            deltaX = x1 - x2,
            deltaY = y1 - y2,
            deg = Math.abs(deltaX) < 0.001 ? 270 : Math.atan(deltaY / deltaX) * 180 / Math.PI;
        
        //tranform origin
        const 
            transformOriginX = Math.round(measureWidth / 2),
            transformOriginY = Math.round(MEASURE_HEIGHT / 2);

        //position
        const 
            middlePoint = (a, b) => Math.min(a, b) + Math.abs(a - b) / 2,
            offsetX = verticalMeasure ? -MEASURE_HEIGHT : 0,
            offsetY = horizontalMeasure ? MEASURE_HORIZONTAL_OFFSET : 0,
            top = Math.round(middlePoint(y2, y1) + offsetY + ITEM_MARGIN_TOP),
            left = Math.round(middlePoint(x2, x1) - measureWidth / 2 + offsetX + ITEM_MARGIN_LEFT);
        
            
        return {
            top: `${top}px`,
            left: `${left}px`,
            width: `${measureWidth}px`,
            arrowWidth: `${arrowWidth}px`,
            deg,
            text,
            transformOriginX,
            transformOriginY
        };
    });
};