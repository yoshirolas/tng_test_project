/*global defaultMode, modes*/
import { SWITCH_ITEM, ADD_ITEM, REMOVE_ITEM } from '../../constants/actions';

const getDefaultItem = () => [modes[defaultMode].items[0]];
const initialState = {
    modes: modes,
    currentMode: defaultMode,
    currentItems: getDefaultItem()
};

export default function handle(state=initialState, action) {
    switch(action.type) {
        case SWITCH_ITEM: 
            return {
                ...state,
                currentItems: [action.payload.item],
                currentMode: action.payload.mode
            };
        case ADD_ITEM: 
            return {
                ...state,
                currentItems: [...state.currentItems, action.payload]
            };
        case REMOVE_ITEM: 
            return {
                ...state,
                currentItems: state.currentItems.filter((item) => item.id !== action.payload.id)
            };
        default: 
            return state;
    }
}