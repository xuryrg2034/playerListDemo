import {apiUrl, DELETE_ITEM, SYSTEM_MESSAGE} from "../../../../constants";
import requestWrapper from "../../../../utils/requestWrapper";
import fetchErrorHandler from "../../../../helpers/fetchErrorHandler";


const deleteItemAction = (data) => async (dispatch) => {
    try {
        const resp = await requestWrapper({
            method: "DELETE",
            url: `${apiUrl}/apiPlayerList/deleteItem`,
            params: data
        });

        if(resp.data.success) {
            dispatch({
                type: DELETE_ITEM,
                payload: {itemId: data.itemId}
            });
        } else {
            dispatch({
                type: SYSTEM_MESSAGE,
                payload: {message: resp.data.message}
            });
        }

        return {success: resp.data.success};
    } catch (e) {
        fetchErrorHandler({dispatch, e});

        return {success: false};
    }

};

export default deleteItemAction;

