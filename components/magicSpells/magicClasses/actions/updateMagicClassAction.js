import {apiUrl, SYSTEM_MESSAGE, UPDATE_MAGIC_CLASS} from "../../../../constants";
import requestWrapper from "../../../../utils/requestWrapper";
import fetchErrorHandler from "../../../../helpers/fetchErrorHandler";


const updateMagicClassAction = (obj) => async (dispatch) => {
    try {
        const resp = await requestWrapper({
            method: "PUT",
            url: `${apiUrl}/apiPlayerList/updateMagicClass`,
            data: {
                info: obj.info,
                magicClassId: obj.magicClassId,
                userId: obj.userId,
                listId: obj.listId
            },
        });


        if(resp.data.success) {
            dispatch({
                type: UPDATE_MAGIC_CLASS,
                payload: {info:obj.info, magicClassId: obj.magicClassId}
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

        return {success: false}
    }
};



export default  updateMagicClassAction;

