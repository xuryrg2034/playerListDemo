import {apiUrl, SYSTEM_MESSAGE, UPDATE_CHARACTERISTICS} from "../../../constants";
import requestWrapper from "../../../utils/requestWrapper";
import fetchErrorHandler from "../../../helpers/fetchErrorHandler";

const updateCharacteristicAction = (stat, listId) => async (dispatch) => {
    try {
        const resp = await requestWrapper({
            method: "PUT",
            url: `${apiUrl}/apiPlayerList/updateCharacteristic`,
            data: {
                listId,
                stat
            },
        });

        if(resp.data.success) {
            dispatch({
                type: UPDATE_CHARACTERISTICS,
                payload: stat
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



export default  updateCharacteristicAction;

