import axios from 'axios';
import {
    apiUrl,
    LIST_INFO_DEFAULT_STATE,
    GET_PLAYER_LIST,
    SYSTEM_MESSAGE
} from "../../../constants";
import requestWrapper from "../../../utils/requestWrapper";
import systemMessage from "../../../static/systemMessage";
import fetchErrorHandler from "../../../helpers/fetchErrorHandler";

const CancelToken = axios.CancelToken;
let cancel;

const getPlayerListInfoAction = ({listId}) => async (dispatch) => {
    dispatch({
        type: LIST_INFO_DEFAULT_STATE,
    });

    if (cancel !== undefined) cancel({cancel: systemMessage.cancel});

    try {
        const resp = await requestWrapper({
            method: "GET",
            url: `${apiUrl}/apiPlayerList/info`,
            cancelToken:  new CancelToken(c => cancel = c),
            params: {
                _id: listId
            }
        });


        if(resp.data.success) {
            dispatch({
                type: GET_PLAYER_LIST,
                payload: resp.data.list[0]
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

export default  getPlayerListInfoAction;

