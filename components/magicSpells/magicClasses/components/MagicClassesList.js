import React from 'react';
import MagicClassItem from "./MagicClassItem";
import {connect} from "react-redux";
import updateMagicClassAction from "../actions/updateMagicClassAction";
import deleteMagicClassAction from "../actions/deleteMagicClassAction";

const MagicClassesList = React.memo((props) => {
    const onSubmit = (values, classId) => {
        props.updateMagicClass({
            info: values,
            magicClassId: classId,
            userId: props.userId,
            listId: props.listId,
        });
    }

    const deleteMagicClass = (classId) => {
        props.deleteMagicClass({
            magicClassId: classId,
            userId: props.userId,
            listId: props.listId,
        });
    }

    const magicClassItems = props.items.map(el => {
        if(el === null) return null;
        return(
            <MagicClassItem
                key={el._id}
                characteristics={props.characteristics}
                onSubmit={onSubmit}
                skillBonus={props.skillBonus}
                deleteMagicClass={deleteMagicClass}
                {...el}
            />
        )
    });

    if(!magicClassItems.length || magicClassItems.every(el => el === null)) return null;
    return(
        <>
            <div className={`magicClasses__header`}>
                <div className={`magicClasses__classTitle`}></div>
                <div className={`magicClasses__characteristic`}></div>
                <div className={`magicClasses__savingThrow magicClasses__header_text`}>Спас</div>
                <div className={`magicClasses__penetration magicClasses__header_text`}>Точность</div>
            </div>
            <div className={`magicClasses__list`}>{magicClassItems}</div>
        </>
    )
});

function stateProps(state) {
    return {

        listId:  state.playerListInfo.list._id,
        characteristics: state.playerListInfo.list.characteristics,
        skillBonus: state.playerListInfo.list.skillBonus,
    }

}

function dispatchProps(dispatch) {
    return {
        updateMagicClass: (data) => {
            dispatch(updateMagicClassAction(data))
        },
        deleteMagicClass: (data) => {
            dispatch(deleteMagicClassAction(data));
        }
    }
}

export default connect(stateProps, dispatchProps)(MagicClassesList);