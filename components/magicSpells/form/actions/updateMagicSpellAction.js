import {apiUrl, SYSTEM_MESSAGE, UPDATE_MAGIC_SPELL} from "../../../../constants";
import requestWrapper from "../../../../utils/requestWrapper";
import fetchErrorHandler from "../../../../helpers/fetchErrorHandler";


const updateMagicSpellAction = (obj) => async (dispatch) => {
    try {

        const resp = await requestWrapper({
            method: "PUT",
            url: `${apiUrl}/apiPlayerList/updateMagicSpell`,
            data: {
                info: obj.info,
                spellId: obj.spellId,
            },
        });


        if(resp.data.success) {
            dispatch({
                type: UPDATE_MAGIC_SPELL,
                payload: {info:obj.info, spellId: obj.spellId}
            });
        } else {
            dispatch({
                type: SYSTEM_MESSAGE,
                payload: {message: resp.data.message}
            });
        }

        return {success: resp.data.success};

    } catch(e) {
        fetchErrorHandler({dispatch, e});

        return {success: false};
    }
};



export default  updateMagicSpellAction;

