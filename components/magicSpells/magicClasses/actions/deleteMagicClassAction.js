import {apiUrl, DELETE_MAGIC_CLASS, SYSTEM_MESSAGE} from "../../../../constants";
import requestWrapper from "../../../../utils/requestWrapper";
import axios from "axios";
import systemMessage from "../../../../static/systemMessage";
import fetchErrorHandler from "../../../../helpers/fetchErrorHandler";

const CancelToken = axios.CancelToken;
let cancel;

const deleteMagicClassAction = (data) => async (dispatch) => {
    if (cancel !== undefined) cancel({cancel: systemMessage.cancel});

    try {
        const resp = await requestWrapper({
            method: "DELETE",
            url: `${apiUrl}/apiPlayerList/deleteMagicClass`,
            cancelToken:  new CancelToken(c => cancel = c),
            params: data
        });


        const {success, message} = resp.data;

        if(success) {
            dispatch({
                type: DELETE_MAGIC_CLASS,
                payload: data.magicClassId
            });
        } else {
            dispatch({
                type: SYSTEM_MESSAGE,
                payload: {message}
            });
        }

        return {success};
    } catch (e) {
        fetchErrorHandler({dispatch, e});

        return {success: false}
    }
};



export default  deleteMagicClassAction;

