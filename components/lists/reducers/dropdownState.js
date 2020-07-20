import {LISTS_DROPDOWN_SET_ID, LISTS_DROPDOWN_DEFAULT} from '../../../constants';

const initialState = {
    listId: ''
};


export default function (state = initialState, action) {

    switch (action.type) {
        case LISTS_DROPDOWN_SET_ID:
            return  {...state, ...action.payload};

        case LISTS_DROPDOWN_DEFAULT:
            return initialState;

        default:
            return state;
    }
}
