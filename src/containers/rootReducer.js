import { combineReducers } from 'redux';
import ComparePanel from './ComparePanel/reducer';
import ControlPanel from './ControlPanel/reducer';

export default combineReducers({
    ComparePanel,
    ControlPanel
});