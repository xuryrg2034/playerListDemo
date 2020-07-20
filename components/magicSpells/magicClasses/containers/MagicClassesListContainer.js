import React, {useEffect} from 'react';
import MagicClassesList from "../components/MagicClassesList";
import {connect} from "react-redux";
import getMagicClassAction from "../actions/getMagicClassAction";

const MagicClassesListContainer = React.memo((props) => {
    const {getMagicClasses, listId} = props;
    useEffect(() => {
        getMagicClasses({listId})
    },[getMagicClasses, listId]);

    if(!props.classesList.length) return null
    return(
        <MagicClassesList items={props.classesList}/>
    )
});

function stateProps(state) {
    return {
        classesList: state.magicSpells.magicClasses,

        listId:  state.playerListInfo.list._id,
    }

}

function dispatchProps(dispatch) {
    return {
        getMagicClasses: (data) => {
            dispatch(getMagicClassAction(data));
        }
    }
}

export default connect(stateProps, dispatchProps)(MagicClassesListContainer);