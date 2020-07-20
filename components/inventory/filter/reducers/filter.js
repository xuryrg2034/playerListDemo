import {SET_ITEM_FILTER_STATE_DEFAULT, SET_ITEM_FILTER, LIST_INFO_DEFAULT_STATE} from "../../../../constants";

const initialState = {
    fieldKey: '',
    fieldValue: null,
};


export default function (state = initialState, action) {
    switch (action.type) {

        case SET_ITEM_FILTER:
            return  action.payload;

        case SET_ITEM_FILTER_STATE_DEFAULT:
            return initialState;

        case LIST_INFO_DEFAULT_STATE:
            return initialState;

        default:
            return state;
    }
}