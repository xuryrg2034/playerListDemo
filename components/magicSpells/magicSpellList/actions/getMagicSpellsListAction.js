import {apiUrl, GET_MAGIC_SPELLS, SYSTEM_MESSAGE} from "../../../../constants";
import requestWrapper from "../../../../utils/requestWrapper";
import fetchErrorHandler from "../../../../helpers/fetchErrorHandler";
import axios from "axios";
import systemMessage from "../../../../static/systemMessage";

const CancelToken = axios.CancelToken;
let cancel;


const getMagicSpellsListAction = ({listId}) => async (dispatch) => {

    if (cancel !== undefined) cancel({cancel: systemMessage.cancel});

    try {
        const resp = await requestWrapper({
            method: "GET",
            url: `${apiUrl}/apiPlayerList/getMagicSpellsList`,
            cancelToken:  new CancelToken(c => cancel = c),
            params: {
                listId
            },
        });

        if(resp.data.success) {
            const objMagicSpells = resp.data.result.reduce((accum, el) => {
                accum[el._id] = {...el};
                return accum;
            }, {});

            dispatch({
                type: GET_MAGIC_SPELLS,
                payload: objMagicSpells
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

        return {success: false}
    }
};

export default  getMagicSpellsListAction;

