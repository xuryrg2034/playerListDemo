import {apiUrl, SYSTEM_MESSAGE, UPDATE_ITEM} from "../../../../constants";
import requestWrapper from "../../../../utils/requestWrapper";
import axios from "axios";
import systemMessage from "../../../../static/systemMessage";
import fetchErrorHandler from "../../../../helpers/fetchErrorHandler";

const CancelToken = axios.CancelToken;
let cancel;

const updateItemAction = (data) => async (dispatch) => {
    if (cancel !== undefined) cancel({cancel: systemMessage.cancel});

    try {
        const resp = await requestWrapper({
            method: "PUT",
            cancelToken:  new CancelToken(c => cancel = c),
            url: `${apiUrl}/apiPlayerList/updateItem`,
            data: data
        });

        if(resp.data.success) {
            dispatch({
                type: UPDATE_ITEM,
                payload: data
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

        return {success: false};
    }
};

export default updateItemAction;

