import {LIST_INFO_DEFAULT_STATE, MAGIC_SPELL_FILTER_STATE_DEFAULT, SET_MAGIC_SPELL_FILTER} from "../../../../constants";

const initialState = {
    fieldKey: '',
    fieldValue: null,
};


export default function (state = initialState, action) {
    switch (action.type) {

        case SET_MAGIC_SPELL_FILTER:
            return  action.payload;

        case MAGIC_SPELL_FILTER_STATE_DEFAULT:
            return initialState;

        case LIST_INFO_DEFAULT_STATE:
            return initialState;

        default:
            return state;
    }
}