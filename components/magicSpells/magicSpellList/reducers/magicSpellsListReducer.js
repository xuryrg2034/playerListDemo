import {
    GET_MAGIC_SPELLS,
    UPDATE_MAGIC_SPELL,
    APPEND_MAGIC_SPELL,
    DELETE_MAGIC_SPELL,
    LIST_INFO_DEFAULT_STATE
} from "../../../../constants";

const initialState = {};


export default function magicSpellReducer(state = initialState, action) {
    switch (action.type) {

        case GET_MAGIC_SPELLS:
            return {...action.payload};

        case APPEND_MAGIC_SPELL:
            return {...state, ...action.payload};

        case UPDATE_MAGIC_SPELL:
            const {info, spellId} = action.payload;
            state[spellId] = {...state[spellId], ...info};
            return {...state};

        case DELETE_MAGIC_SPELL:
            delete state[action.payload];
            return {...state};

        case LIST_INFO_DEFAULT_STATE:
            return initialState;

        default:
            return state;
    }
}
