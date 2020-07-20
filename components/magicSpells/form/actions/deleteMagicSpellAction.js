import {apiUrl, DELETE_MAGIC_SPELL, SYSTEM_MESSAGE} from "../../../../constants";
import requestWrapper from "../../../../utils/requestWrapper";
import fetchErrorHandler from "../../../../helpers/fetchErrorHandler";


const deleteMagicSpellAction = (data) => async (dispatch) => {
    try {
        const resp = await requestWrapper({
            method: "DELETE",
            url: `${apiUrl}/apiPlayerList/deleteMagicSpell`,
            params: data
        });


        if(resp.data.success) {
            dispatch({
                type: DELETE_MAGIC_SPELL,
                payload: data.spellId
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



export default  deleteMagicSpellAction;

