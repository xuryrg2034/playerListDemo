import {
    APPEND_TITLES_NEW_LIST,
    GET_TITLES_PLAYER_LISTS,
    DEFAULT_STATE,
    REMOVE_TITLE_FROM_LIST,
    UPDATE_TEXT_FIELD
} from "../../../constants";

const initialState = {
    list: [],
    state: "pending"
};


export default function listsTitleReducer(state = initialState, action) {
    switch (action.type) {
        case APPEND_TITLES_NEW_LIST:
            return {...state, list: [...state.list, {...action.payload}]};
        case GET_TITLES_PLAYER_LISTS:
            return {list: [...action.payload.list], status: action.payload.status};

        case UPDATE_TEXT_FIELD:
            if(action.payload.key === 'title') {
                return (
                    {
                        ...state,
                        list: state.list.map(val => {
                            if(val._id === action.payload.listId) {
                                val.title = action.payload.value;
                            }
                            return val;
                        })
                    }
                );
            } else {
                return  state;
            }

        case REMOVE_TITLE_FROM_LIST:
            return {...state, list: [...state.list.filter(val => val._id !== action.payload)]};
            
        case DEFAULT_STATE:
            return initialState;
        default:
            return state;
    }
}
