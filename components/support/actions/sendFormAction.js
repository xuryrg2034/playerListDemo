import requestWrapper from "../../../utils/requestWrapper";
import {apiUrl, SYSTEM_MESSAGE} from "../../../constants";
import fetchErrorHandler from "../../../helpers/fetchErrorHandler";

const sendFormAction = (data) => async (dispatch) => {
    try {
        console.log(data);

        return false;
        const resp = await requestWrapper({
            method: "POST",
            url: `${apiUrl}/apiPlayerList/create`,
            data: {...data},
        });

        const {success, message} = resp.data;

        if(!success) {
            dispatch({
                type: SYSTEM_MESSAGE,
                payload: {message, success}
            });

        }

        return {success}
    } catch (e) {
        fetchErrorHandler({dispatch, e});

        return {success: false}
    }
};

export default  sendFormAction;