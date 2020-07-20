import {
    GET_ALL_ITEMS,
    APPEND_ITEM,
    DELETE_ITEM,
    UPDATE_ITEM,
    LIST_INFO_DEFAULT_STATE
} from "../../../constants";

const initialState = {};


export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ALL_ITEMS:
            return action.payload;

        case APPEND_ITEM:
            return {...state, ...action.payload};

        case UPDATE_ITEM:
            state[action.payload.itemId] = {...state[action.payload.itemId], ...action.payload.info};
            return {...state};

        case DELETE_ITEM:
            delete state[action.payload.itemId];
            return {...state};

        case LIST_INFO_DEFAULT_STATE:
            return initialState;

        default:
            return state;
    }
}
