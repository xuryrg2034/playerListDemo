import {MAGIC_SPELL_POPUP_STATE} from "../../../constants";


const setPopupStateAction = (data) => (dispatch) => {
    dispatch({
        type: MAGIC_SPELL_POPUP_STATE,
        payload: data
    });
};

export default setPopupStateAction;
