import React, {useCallback} from 'react';
import {connect} from "react-redux";
import createMagicClassAction from "../actions/createMagicClassAction";

const MagicClassesBtnCreate = React.memo((props) => {
    const {createMagicClass, listId} = props;
    const createClass = useCallback(() => {
        createMagicClass({listId})
    }, [createMagicClass, listId]);

    return(
        <div className={`magicClasses__btnCreate-wrapper`}>
            <div className={`magicClasses__btnCreate`} onClick={createClass}>Добавить класс заклинателя</div>
        </div>
    )
});

function stateProps(state) {
    return{

        listId:  state.playerListInfo.list._id
    }
}

function dispatchProps(dispatch) {
    return{
        createMagicClass: (data) => {
            dispatch(createMagicClassAction(data));
        }
    }
}

export default connect(stateProps, dispatchProps)(MagicClassesBtnCreate);