import axios from "axios";
import {apiUrl, SYSTEM_MESSAGE} from "../../../../constants";
import requestWrapper from "../../../../utils/requestWrapper";
import systemMessage from "../../../../static/systemMessage";
import fetchErrorHandler from "../../../../helpers/fetchErrorHandler";

const CancelToken = axios.CancelToken;
let cancel;

const updateCellsOfMagickAction = (data) => async (dispatch) => {

    if (cancel !== undefined) cancel({cancel: systemMessage.cancel});

    try {
        const resp = await requestWrapper({
            method: "PUT",
            url: `${apiUrl}/apiPlayerList/updateCellOfMagick/`,
            cancelToken:  new CancelToken(c => cancel = c),
            data: {
                cellId: data.id,
                value: data.value,
                listId: data.listId,
                type: data.type,
            },
        });

        if(!resp.data.success) {
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



export default  updateCellsOfMagickAction;

