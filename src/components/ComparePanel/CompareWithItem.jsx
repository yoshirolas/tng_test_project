import React from 'react';
import { measures } from '../../core/ui/measures';
import { Item } from './Item/Item';
import { DragArea } from '../Dragging/DragArea';

export const CompareWithItem = (props) => {
    const compareWithItemCalculations = props.calculations.compareProducts(props.product, props.item);
    const productMeasures = measures(props.product, compareWithItemCalculations.product.size);
    const itemMeasures = measures(props.item, compareWithItemCalculations.item.size);
    return (
        <DragArea bodySize = {props.bodySize} calculations = {compareWithItemCalculations}>
            <Item 
                size={ compareWithItemCalculations.product.size }
                position={ compareWithItemCalculations.product.position }
                measures={ productMeasures }
                item={ props.product }
            />
            <Item 
                size={ compareWithItemCalculations.item.size }
                position={ compareWithItemCalculations.item.position }
                measures={ itemMeasures }
                item={ props.item }
            />
        </DragArea>
    );
};
