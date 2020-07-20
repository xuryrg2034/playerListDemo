import {apiUrl, SYSTEM_MESSAGE, UPDATE_TEXT_FIELD} from "../../constants";
import requestWrapper from "../../utils/requestWrapper";
import fetchErrorHandler from "../../helpers/fetchErrorHandler";
import systemMessage from "../../static/systemMessage";
import axios from "axios";

const CancelToken = axios.CancelToken;
let cancel = {};

const updateTextFieldAction = (obj) => async (dispatch) => {

    const {value, listId, fieldKey, userId} = obj;

    if (cancel[fieldKey] !== undefined) cancel[fieldKey]({cancel: systemMessage.cancel});

    try {
        const resp = await requestWrapper({
            method: "PUT",
            url: `${apiUrl}/apiPlayerList/updateTextField`,
            cancelToken:  new CancelToken(c => cancel[fieldKey] = c),
            data: {field: fieldKey, listId, value, userId}
        });


        const data = {
            key: fieldKey,
            value,
            listId
        };

        if(resp.data.success) {
            dispatch({
                type: UPDATE_TEXT_FIELD,
                payload: data,
            });
        } else {
            dispatch({
                type: SYSTEM_MESSAGE,
                payload: {message: resp.data.message},
            });
        }
        return {success: resp.data.success}
    } catch (e) {
        fetchErrorHandler({dispatch, e});

        return {success: false}
    }


};



export default  updateTextFieldAction;

