import {
    CREATE_LIST_ELEMENT,
    DELETE_LIST_ELEMENT,
    UPDATE_LIST_ELEMENT,
    GET_LIST_INFO,
    LIST_INFO_DEFAULT_STATE
} from "../../../constants";

const initialState = {};

let id, listType, info;

export default function listsReducer(state = initialState, action) {

    switch (action.type) {

        case GET_LIST_INFO:
            listType = action.payload.listType;
            info = action.payload.info;

            return  {...state, [listType]: {...info}};

        case CREATE_LIST_ELEMENT:
            id = action.payload.info.id;
            listType = action.payload.listType;
            info = action.payload.info;

            delete action.payload.info.id;

            if(state[listType] === undefined) state[listType] = {};

            state[listType][id] = {...info};
            return {...state};

        case UPDATE_LIST_ELEMENT:
            return ({
                ...state,
                [action.payload.listType]: {
                    ...state[action.payload.listType],
                    ...action.payload.elem
                }
            });

        case DELETE_LIST_ELEMENT:
            id = action.payload.id;
            listType = action.payload.listType;

            delete state[listType][id];
            return {...state};

        case LIST_INFO_DEFAULT_STATE:
            return initialState;
        default:
            return state;
    }
}
