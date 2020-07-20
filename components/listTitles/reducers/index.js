import {combineReducers} from "redux";
import listInfo from "../../listInfo/reducers/listInfo";
import mobileState from '../../listInfo/reducers/mobileState';

export default combineReducers({
    list: listInfo,
    mobileState
});
