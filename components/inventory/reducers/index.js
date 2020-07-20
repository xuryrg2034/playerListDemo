import {combineReducers} from "redux";
import itemsReducer from "./itemsReducer";
import popupState from "../form/reducers/popupState";
import filter from '../filter/reducers/filter';

export default combineReducers({
    items: itemsReducer,
    popupState,
    filter
});
