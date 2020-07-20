import {apiUrl, APPEND_TITLES_NEW_LIST, SYSTEM_MESSAGE} from "../../../constants";
import requestWrapper from "../../../utils/requestWrapper";
import fetchErrorHandler from "../../../helpers/fetchErrorHandler";


const createPlayerListAction = (data) => async (dispatch) => {
    try {
        const resp = await requestWrapper({
            method: "POST",
            url: `${apiUrl}/apiPlayerList/create`,
            data: {...data},
        });

        const {playerList, success, message} = resp.data;

        if(success) {
            dispatch({
                type: APPEND_TITLES_NEW_LIST,
                payload: playerList
            });

            return {success, id: playerList._id}
        } else {
            dispatch({
                type: SYSTEM_MESSAGE,
                payload: {message, success}
            });

            return {success}
        }
    } catch (e) {
        fetchErrorHandler({dispatch, e});

        return {success: false}
    }
};

export default  createPlayerListAction;

