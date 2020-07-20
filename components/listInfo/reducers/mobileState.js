import {DEFAULT_STATE, SET_MOBILE_COMPONENT_ID, SET_TEXT_EDITOR_ID} from "../../../constants";

const initialState = {
    componentId: Number(localStorage['mobileComponentId']) || 0,
    textEditorId: ''
};


export default function mobileState(state = initialState, action) {
    switch (action.type) {
        case SET_MOBILE_COMPONENT_ID:
            localStorage['mobileComponentId'] = action.payload;
            return {...state, componentId: action.payload};

        case SET_TEXT_EDITOR_ID:
            localStorage['CharacterInfoContainerEditor'] = action.payload;
            return {...state, textEditorId: action.payload};

        case DEFAULT_STATE:
            return initialState;

        default:
            return state;
    }
}
