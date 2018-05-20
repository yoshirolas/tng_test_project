import { SWITCH_ITEM, ADD_ITEM, REMOVE_ITEM } from '../../constants/actions';

export function switchItem(item, mode) {
    return {
        type: SWITCH_ITEM,
        payload: { item, mode }
    };
}

export function addItem(item) {
    return {
        type: ADD_ITEM,
        payload: item
    };
}

export function removeItem(item) {
    return {
        type: REMOVE_ITEM,
        payload: item
    };
}