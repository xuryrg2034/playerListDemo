import {MAGIC_SPELL_POPUP_STATE_DEFAULT, MAGIC_SPELL_POPUP_STATE, LIST_INFO_DEFAULT_STATE} from "../../../../constants";

const initialState = {
    visible: false,
    spellId: '',
    type: ''
};


export default function (state = initialState, action) {
    switch (action.type) {

        case MAGIC_SPELL_POPUP_STATE:
            return  {...state, ...action.payload};

        case MAGIC_SPELL_POPUP_STATE_DEFAULT:
            return initialState;

        case LIST_INFO_DEFAULT_STATE:
            return initialState;

        default:
            return state;
    }
}