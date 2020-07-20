import {apiUrl, CREATE_LIST_ELEMENT, SYSTEM_MESSAGE} from "../../../constants";
import requestWrapper from "../../../utils/requestWrapper";
import fetchErrorHandler from "../../../helpers/fetchErrorHandler";



const createListElementAction = (data) => async (dispatch) => {
    try {
        const resp = await requestWrapper({
            method: "POST",
            url: `${apiUrl}/apiPlayerList/create/infoLists`,
            data: {...data}
        });

        if(resp.data.success) {
            const {listType} = data;
            const {_id, title, description} = resp.data.result;
            const info = {
                id: _id,
                title,
                description
            };

            dispatch({
                type: CREATE_LIST_ELEMENT,
                payload: {info, listType}
            });

            return {id: _id, success: resp.data.success}
        } else {
            dispatch({
                type: SYSTEM_MESSAGE,
                payload: {message: resp.data.message}
            });

            return {success: resp.data.success}
        }
    } catch (e) {
        fetchErrorHandler({dispatch, e});

        return {success: false};
    }
};

export default createListElementAction;
