import {
    APPEND_MAGIC_CLASS,
    DELETE_MAGIC_CLASS,
    GET_MAGIC_CLASSES,
    LIST_INFO_DEFAULT_STATE,
    UPDATE_MAGIC_CLASS
} from "../../../../constants";

const initialState = [];


export default function (state = initialState, action) {
    switch (action.type) {

        case GET_MAGIC_CLASSES:
            return [...action.payload];

        case UPDATE_MAGIC_CLASS:
            return state.map(el => {
                if(el !== null) {
                    if(el._id === action.payload.magicClassId) {
                        el = {...el, ...action.payload.info};
                    }
                }

                return el;
            });

        case APPEND_MAGIC_CLASS:
            return  [...state, action.payload];


        case DELETE_MAGIC_CLASS:
            return state.map(el => {
                if (el !== null && el._id === action.payload) el = null;
                return el;
            });

        case LIST_INFO_DEFAULT_STATE:
            return initialState;

        default:
            return state;
    }
}