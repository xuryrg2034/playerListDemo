import {LIST_POPUP_STATE, LIST_POPUP_STATE_DEFAULT} from '../../../constants';

const initialState = {
    featureType: '',
    visible: false,
    featureId: '',
    type: ''
};


export default function (state = initialState, action) {

    switch (action.type) {
        case LIST_POPUP_STATE:
            return  {...state, ...action.payload}

        case LIST_POPUP_STATE_DEFAULT:
            return initialState;

        default:
            return state;
    }
}
