import {apiUrl, GET_ALL_ITEMS, SYSTEM_MESSAGE} from "../../../../constants";
import requestWrapper from "../../../../utils/requestWrapper";
import systemMessage from "../../../../static/systemMessage";
import axios from "axios";
import fetchErrorHandler from "../../../../helpers/fetchErrorHandler";
const CancelToken = axios.CancelToken;
let cancel;

const getItemsAction = (data) => async (dispatch) => {

    if (cancel !== undefined) cancel({cancel: systemMessage.cancel});

    try {
        const resp = await requestWrapper({
            method: "GET",
            url: `${apiUrl}/apiPlayerList/getItems`,
            cancelToken:  new CancelToken(c => cancel = c),
            params: data
        });

        if(resp.data.success) {
            const objItems = resp.data.result.reduce((accum, el) => {
                accum[el._id] = {...el};
                return accum;
            }, {});

            dispatch({
                type: GET_ALL_ITEMS,
                payload: objItems
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

export default  getItemsAction;

