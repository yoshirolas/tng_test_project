import { SET_MEASURE_MODE } from '../../constants/actions';

const initialState = {
  measureMode: 'cm'
};

export default function handle(state=initialState, action) {
  switch(action.type) {
    case SET_MEASURE_MODE: 
        return {
          ...state, 
          measureMode: action.payload
        }
    default: 
        return state;
  }
}