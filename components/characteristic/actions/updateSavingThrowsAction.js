
import {apiUrl, SYSTEM_MESSAGE, UPDATE_SAVING_THROWS} from "../../../constants";
import requestWrapper from "../../../utils/requestWrapper";


const updateSavingThrowsAction = (obj) => async (dispatch) => {
    const {characteristicId, wield, listId} = obj;

    const resp = await requestWrapper({
        method: "PUT",
        url: `${apiUrl}/apiPlayerList/updateSavingThrows`,
        data: {
            listId,
            characteristicId,
            wield
        }
    });

    if(resp.data.success) {
        dispatch({
            type: UPDATE_SAVING_THROWS,
            payload: obj
        });
    } else {
        dispatch({
            type: SYSTEM_MESSAGE,
            payload: {message: resp.data.message}
        });
    }

};



export default  updateSavingThrowsAction;