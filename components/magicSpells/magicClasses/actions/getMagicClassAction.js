import {apiUrl, GET_MAGIC_CLASSES, SYSTEM_MESSAGE} from "../../../../constants";
import requestWrapper from "../../../../utils/requestWrapper";
import fetchErrorHandler from "../../../../helpers/fetchErrorHandler";
import axios from "axios";
import systemMessage from "../../../../static/systemMessage";

const CancelToken = axios.CancelToken;
let cancel;


const getMagicClassAction = (data) => async (dispatch) => {

    if (cancel !== undefined) cancel({cancel: systemMessage.cancel});

    try {
        const resp = await requestWrapper({
            method: "GET",
            url: `${apiUrl}/apiPlayerList/getMagicClasses`,
            cancelToken:  new CancelToken(c => cancel = c),
            params: data
        });


        if(resp.data.success) {
            dispatch({
                type: GET_MAGIC_CLASSES,
                payload: resp.data.result
            });
            return {success: resp.data.success}
        } else {
            dispatch({
                type: SYSTEM_MESSAGE,
                payload: {message: resp.data.message}
            });

            return {success: resp.data.success}
        }
    } catch (e) {
        fetchErrorHandler({dispatch, e});

        return {success: false}
    }
};

export default getMagicClassAction;

