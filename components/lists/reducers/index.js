import {combineReducers} from "redux";
import listsReducer from "./listsReducer";
import popupState from './popupState';
import dropdownState from './dropdownState';

export default combineReducers({
    listsInfo: listsReducer,
    popupState,
    dropdownState
});
