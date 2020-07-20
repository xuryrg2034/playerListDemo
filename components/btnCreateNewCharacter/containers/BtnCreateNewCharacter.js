import React, {useState, useEffect, useCallback} from 'react';
import {connect} from "react-redux";
import createPlayerListAction from "../actions/createPlayerListAction";
import r from '../../../routerConfig'

const BtnCreateNewCharacter = React.memo((props) => {
    const [disabled, setDisabled] = useState(false);

    const {history, createPlayerListAction, userId} = props;
    const createPlayerList = useCallback(async () => {
        if(disabled) return false;

        setDisabled(true);
        const resp = await createPlayerListAction({userId});
        if(resp.success) {
            history.push(`${r.list.path}/${resp.id}`)
        }
        setDisabled(false);
    }, [history, disabled, createPlayerListAction, userId]);


    //Создаю лист, если у юзера не было листов
    const {list} = props;
    useEffect(() => {
        if(!list.length) {
            createPlayerList();
        }
    }, [list, createPlayerList]);


    return(
        <div
            className="playerLists__info_addNewCharacter"
            disabled={disabled}
            onClick={createPlayerList}
        >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.7 0H7.3V7.3H0V8.7H7.3V16H8.7V8.7H16V7.3H8.7V0Z" fill="#C1C2C4" fillOpacity="0.3" />
            </svg>
        </div>
    )
});

function stateProps(state) {
    return {

        list: state.listsTitle.list,
    }
}

function dispatchProps(dispatch) {
    return {
        createPlayerListAction: (data) => {
            return dispatch(createPlayerListAction(data));
        }
    }
}

export default connect(stateProps, dispatchProps)(BtnCreateNewCharacter);