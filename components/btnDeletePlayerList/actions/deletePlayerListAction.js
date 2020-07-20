import {apiUrl, REMOVE_TITLE_FROM_LIST, SYSTEM_MESSAGE} from "../../../constants";
import requestWrapper from "../../../utils/requestWrapper";
import fetchErrorHandler from "../../../helpers/fetchErrorHandler";



const deletePlayerListAction = ({id}) => async (dispatch) => {
    try {
        const resp = await requestWrapper({
            method: "DELETE",
            url: `${apiUrl}/apiPlayerList/delete`,
            params: { id }
        });

        if(resp.data.success) {
            dispatch({
                type: REMOVE_TITLE_FROM_LIST,
                payload: id,
            });
        } else {
            dispatch({
                type: SYSTEM_MESSAGE,
                payload: {message: resp.data.message},
            });
        }

        return {success: resp.data.success};
    } catch (e) {
        fetchErrorHandler({dispatch, e});

        return {success: false}
    }
};

export default  deletePlayerListAction;

