import {apiUrl, APPEND_MAGIC_SPELL, SYSTEM_MESSAGE} from "../../../../constants";
import requestWrapper from "../../../../utils/requestWrapper";
import fetchErrorHandler from "../../../../helpers/fetchErrorHandler";


const createMagicSpellAction = (data) => async (dispatch) => {
    try {
        const resp = await requestWrapper({
            method: "POST",
            url: `${apiUrl}/apiPlayerList/create/magicSpell`,
            data: data
        });

        if(resp.data.success) {
            let magicSpell = {};
            magicSpell[resp.data.result._id] = resp.data.result;

            dispatch({
                type: APPEND_MAGIC_SPELL,
                payload: magicSpell
            });
            return {success: resp.data.success, id: resp.data.result._id}
        } else {
            dispatch({
                type: SYSTEM_MESSAGE,
                payload: {message: resp.data.message}
            });

            return {success: resp.data.success};
        }
    } catch (e) {
        fetchErrorHandler({dispatch, e});

        return {success: false};
    }
};

export default createMagicSpellAction;

