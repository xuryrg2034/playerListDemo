import React, {useState, useEffect, useCallback} from 'react';
import {connect} from "react-redux";
import deletePlayerListAction from "../actions/deletePlayerListAction";
import '../styles/btnDeletePlayerList.scss';
import {withRouter} from "react-router-dom";
import r from "../../../routerConfig";

const BtnDeletePlayerList = React.memo((props) => {
    const [disabled, setDisabled] = useState(false);
    const [deleted, setDeleted] = useState(false);

    const {deletePlayerListAction, listId} = props;
    const deletePlayerList = useCallback(async () => {
        if(disabled) return null;

        setDisabled(true);
        await deletePlayerListAction({id: listId});

        setDeleted(true);
        setDisabled(false);
    }, [deletePlayerListAction, listId, disabled]);


    const {list, history} = props;
    useEffect(() => {
        if(list.length && deleted) {
            history.push(`${r.list.path}/${list[0]._id}`);
            setDeleted(false);
        }
    }, [deleted, list, history]);

    return(
        !!Object.keys(props.listInfo).length &&
            <div
                className={`btnDeleteCharacter`}
                onClick={deletePlayerList}
                disabled={disabled}
            >Удалить персонажа</div>
    )
});

function stateProps(state) {
    return {
        list: state.listsTitle.list,
        listId: state.playerListInfo.list._id,
        listInfo: state.playerListInfo.list
    }
}

function dispatchProps(dispatch) {
    return {
        deletePlayerListAction: (data) => {
            return dispatch(deletePlayerListAction(data));
        }
    }
}

export default withRouter(connect(stateProps, dispatchProps)(BtnDeletePlayerList));