import {apiUrl, GET_LIST_INFO, SYSTEM_MESSAGE} from "../../../constants";
import requestWrapper from "../../../utils/requestWrapper";
import fetchErrorHandler from "../../../helpers/fetchErrorHandler";
import axios from "axios";
import systemMessage from "../../../static/systemMessage";

const CancelToken = axios.CancelToken;
let cancel = {};

const getListElementAction = (data) => async (dispatch) => {

    const {listType} = data;

    if (cancel[listType] !== undefined) cancel[listType]({cancel: systemMessage.cancel});

    try {
        const resp = await requestWrapper({
            method: "GET",
            url: `${apiUrl}/apiPlayerList/getInfoLists`,
            cancelToken:  new CancelToken(c => cancel[listType] = c),
            params: {...data}
        });

        if(resp.data.success) {
            const info = resp.data.result.reduce((accum, val) => {
                const {title, description, _id} = val;
                accum[_id] = {title, description};
                return {...accum};
            },{});

            dispatch({
                type: GET_LIST_INFO,
                payload: {info, listType}
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

export default getListElementAction;
