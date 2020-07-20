import {SET_ITEM_FILTER} from "../../../../constants";

const setItemFilter = (data) => (dispatch) => {
    dispatch({
        type: SET_ITEM_FILTER,
        payload: data,
    })
}

export default setItemFilter;