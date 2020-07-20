import {apiUrl, SYSTEM_MESSAGE, UPDATE_TEXT_FIELD} from "../../../constants";
import requestWrapper from "../../../utils/requestWrapper";
import systemMessage from "../../../static/systemMessage";
import fetchErrorHandler from "../../../helpers/fetchErrorHandler";


const createPlayerListAction = (data) => async (dispatch) => {
    let formData = new FormData();
    formData.append('filedata', data.file);
    formData.append('listId', data.listId);
    formData.append('userId', data.userId);

    try {
        const resp = await requestWrapper({
            method: "POST",
            url: `${apiUrl}/apiPlayerList/uploadAvatar`,
            data: formData,
            headers: {'Content-Type': 'multipart/form-data'}
        });


        if(resp.data.success) {
            dispatch({
                type: UPDATE_TEXT_FIELD,
                payload: {key: 'avatarUrl', value: resp.data.fileName},
            });
        } else {
            dispatch({
                type: SYSTEM_MESSAGE,
                payload: {message: resp.data.message},
            });
        }

        return {success: resp.data.success}
    } catch (e) {
        fetchErrorHandler({dispatch, e, message: systemMessage.largeImage});

        return {success: false}
    }
};

export default  createPlayerListAction;

