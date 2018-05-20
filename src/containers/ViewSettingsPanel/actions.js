import { SET_MEASURE_MODE } from '../../constants/actions';

export function setMeasureMode(mode) {
    return {
        type: SET_MEASURE_MODE,
        payload: mode
    };
}