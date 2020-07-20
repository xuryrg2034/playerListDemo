import {SYSTEM_MESSAGE, DEFAULT_SYSTEM_MESSAGE_STATE} from "../../../constants";


const initialState = {
    message: null
};


export default function (state = initialState, {type, payload}) {
    switch (type) {
        case SYSTEM_MESSAGE:
            return {...payload};

        case DEFAULT_SYSTEM_MESSAGE_STATE:
            return initialState;

        default:
            return state;
    }
}