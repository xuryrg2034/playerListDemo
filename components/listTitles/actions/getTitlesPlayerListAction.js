
import {apiUrl, GET_TITLES_PLAYER_LISTS, SYSTEM_MESSAGE} from "../../../constants";
import requestWrapper from "../../../utils/requestWrapper";
import fetchErrorHandler from "../../../helpers/fetchErrorHandler";
import axios from "axios";
import systemMessage from "../../../static/systemMessage";

const CancelToken = axios.CancelToken;
let cancel;




const getTitlesPlayerListAction = (data) => async (dispatch) => {

    if (cancel !== undefined) cancel({cancel: systemMessage.cancel});

    try {
        const resp = await requestWrapper({
            method: "GET",
            url: `${apiUrl}/apiPlayerList/getFields`,
            cancelToken:  new CancelToken(c => cancel = c),
            params: {
                params: 'title _id' //Принимает строку параметров которые нужно вернуть при запросе
            }
        });

        if(resp.data.success) {
            dispatch({
                type: GET_TITLES_PLAYER_LISTS,
                payload: {
                    list: resp.data.result,
                    status: 'success'
                }
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

export default  getTitlesPlayerListAction;

