
import {apiUrl, APPEND_ITEM, SYSTEM_MESSAGE} from "../../../../constants";
import requestWrapper from "../../../../utils/requestWrapper";
import fetchErrorHandler from "../../../../helpers/fetchErrorHandler";


const createItemAction = (data) => async (dispatch) => {
    try {
        const resp = await requestWrapper({
            method: "POST",
            url: `${apiUrl}/apiPlayerList/create/item`,
            data: {...data}
        });

        if(resp.data.success) {
            let item = {};
            item[resp.data.result._id] = resp.data.result;

            dispatch({
                type: APPEND_ITEM,
                payload: item
            });

            return {success: resp.data.success, id: resp.data.result._id}
        } else {
            dispatch({
                type: SYSTEM_MESSAGE,
                payload: {message: resp.data.message}
            });

            return {success: resp.data.success}
        }
    } catch (e) {
        fetchErrorHandler({dispatch, e});

        return {success: false};
    }
};

export default createItemAction;

