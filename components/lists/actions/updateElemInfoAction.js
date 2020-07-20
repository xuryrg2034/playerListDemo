import {apiUrl, SYSTEM_MESSAGE, UPDATE_LIST_ELEMENT} from "../../../constants";
import requestWrapper from "../../../utils/requestWrapper";
import fetchErrorHandler from "../../../helpers/fetchErrorHandler";

const updateElemInfoAction = (data) => async (dispatch) => {
    try {
        const {title, description, id, listType} = data;
        const resp = await requestWrapper({
            method: "PUT",
            url: `${apiUrl}/apiPlayerList/updateInfoLists`,
            data: {info: {title, description}, listType, id}
        });


        if(resp.data.success) {
            const elem = {
                [id]: {title, description}
            };

            dispatch({
                type: UPDATE_LIST_ELEMENT,
                payload: {elem, listType}
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

export default updateElemInfoAction;
