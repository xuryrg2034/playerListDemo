import {apiUrl, APPEND_MAGIC_CLASS, SYSTEM_MESSAGE} from "../../../../constants";
import requestWrapper from "../../../../utils/requestWrapper";
import fetchErrorHandler from "../../../../helpers/fetchErrorHandler";


const createMagicClassAction = (data) => async (dispatch) => {
    try {
        const resp = await requestWrapper({
            method: "POST",
            url: `${apiUrl}/apiPlayerList/create/magicClass`,
            data: data
        });


        if(resp.data.success) {
            dispatch({
                type: APPEND_MAGIC_CLASS,
                payload: resp.data.result
            });
        } else {
            dispatch({
                type: SYSTEM_MESSAGE,
                payload: {message: resp.data.message}
            });
        }

        return {success: resp.data.success}
    } catch (e) {
        fetchErrorHandler({dispatch, e});

        return {success: false}
    }
};

export default createMagicClassAction;

