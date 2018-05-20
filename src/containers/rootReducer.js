import { combineReducers } from 'redux';
import ComparePanel from './ComparePanel/reducer';
import ControlPanel from './ControlPanel/reducer';
import ViewSettingsPanel from './ViewSettingsPanel/reducer';


export default combineReducers({
    ComparePanel,
    ControlPanel,
    ViewSettingsPanel
});