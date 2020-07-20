import {apiUrl, DELETE_LIST_ELEMENT, SYSTEM_MESSAGE} from "../../../constants";
import requestWrapper from "../../../utils/requestWrapper";
import fetchErrorHandler from "../../../helpers/fetchErrorHandler";

const deleteElemInfoAction = (data) => async (dispatch) => {
    try {
        const resp = await requestWrapper({
            method: "DELETE",
            url: `${apiUrl}/apiPlayerList/deleteInfoListsItem`,
            params: {...data}
        });

        if(resp.data.success) {
            dispatch({
                type: DELETE_LIST_ELEMENT,
                payload: {...data}
            });
        } else {
            dispatch({
                type: SYSTEM_MESSAGE,
                payload: {message: resp.data.message}
            });
        }

        return  {success: resp.data.success};
    } catch (e) {
        fetchErrorHandler({dispatch, e});

        return {success: false};
    }
};

export default deleteElemInfoAction;
