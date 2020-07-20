import {apiUrl, SYSTEM_MESSAGE, UPDATE_SKILLS} from "../../../constants";
import requestWrapper from "../../../utils/requestWrapper";


const updateSkillsAction = (obj) => async (dispatch) => {
    const {listId, statId, values} = obj;

    const resp = await requestWrapper({
        method: "PUT",
        url: `${apiUrl}/apiPlayerList/updateSkills`,
        data: {
            listId,
            values,
            statId
        }
    });

    if(resp.data.success) {
        dispatch({
            type: UPDATE_SKILLS,
            payload: {values, statId}
        });
    } else {
        dispatch({
            type: SYSTEM_MESSAGE,
            payload: {message: resp.data.message}
        });
    }

    return {success: resp.data.success}
};



export default  updateSkillsAction;

