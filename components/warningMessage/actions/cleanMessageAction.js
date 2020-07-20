import {DEFAULT_SYSTEM_MESSAGE_STATE} from "../../../constants";

const cleanMessageAction = (dispatch) => {
    dispatch({
        type: DEFAULT_SYSTEM_MESSAGE_STATE
    })
};


export default cleanMessageAction;