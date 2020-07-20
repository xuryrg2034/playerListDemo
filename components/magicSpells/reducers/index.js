import {combineReducers} from "redux";
import magicSpellReducer from "../magicSpellList/reducers/magicSpellsListReducer";
import popupState from '../form/reducers/popupState';
import filter from '../filter/reducers/filter';
import magicClasses from '../magicClasses/reducers/magicClassesReducer';

export default combineReducers({
    magicSpellsList: magicSpellReducer,
    popupState,
    filter,
    magicClasses
});
