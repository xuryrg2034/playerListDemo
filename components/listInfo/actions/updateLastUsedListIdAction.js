import {
    apiUrl, SYSTEM_MESSAGE, UPDATE_USER_INFO,
} from "../../../constants";
import requestWrapper from "../../../utils/requestWrapper";
import axios from "axios";
import systemMessage from "../../../static/systemMessage";


const CancelToken = axios.CancelToken;
let cancel;

const updateLastUsedListIdAction = ({lastUsedList}) => async (dispatch) => {

    if (cancel !== undefined) cancel({cancel: systemMessage.cancel});

    const resp = await requestWrapper({
        method: "POST",
        url: `${apiUrl}/apiPlayerList/user-info/update-last-listId`,
        cancelToken:  new CancelToken(c => cancel = c),
        data: { lastUsedList }
    });


    if(resp.data.success) {
        dispatch({
            type: UPDATE_USER_INFO,
            payload: {lastUsedList}
        });
    } else {
        dispatch({
            type: SYSTEM_MESSAGE,
            payload: {message: resp.data.message}
        })
    }

    return true
};

export default  updateLastUsedListIdAction;

