import {ITEM_POPUP_STATE, ITEM_POPUP_STATE_DEFAULT} from "../../../../constants";

const initialState = {
    visible: false,
    itemId: '',
    type: ''
};


export default function (state = initialState, action) {
    switch (action.type) {

        case ITEM_POPUP_STATE:
            return  {...state, ...action.payload}

        case ITEM_POPUP_STATE_DEFAULT:
            return initialState;

        default:
            return state;
    }
}