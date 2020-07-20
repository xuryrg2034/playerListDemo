import {SET_MAGIC_SPELL_FILTER} from "../../../../constants";

const setMagicSpellFilter = (data) => (dispatch) => {
    dispatch({
        type: SET_MAGIC_SPELL_FILTER,
        payload: data,
    })
}

export default setMagicSpellFilter;