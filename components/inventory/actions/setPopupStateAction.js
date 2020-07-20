import {ITEM_POPUP_STATE} from "../../../constants";


const setPopupStateAction = (data) => (dispatch) => {
    dispatch({
        type: ITEM_POPUP_STATE,
        payload: data
    });
};

export default setPopupStateAction;
