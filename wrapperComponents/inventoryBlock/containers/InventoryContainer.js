import React from 'react';
import {connect} from "react-redux";
import CreateFormContainer from "../../../components/inventory/form/containers/FormItemContainer";
import setPopupStateAction from "../../../components/inventory/actions/setPopupStateAction";
import ItemsContainer from "../../../components/inventory/items/containers/ItemsContainer";
import EquippedWeapons from "../../../components/inventory/equippedWeapons/containers/EquippedWeapons";

const InventoryContainer = React.memo((props) => {
    return(
        <>
            <EquippedWeapons setPopupState={props.setPopupState}/>
            <ItemsContainer setPopupState={props.setPopupState}/>
            {props.popupState.visible && <CreateFormContainer />}
        </>
    )
});


function mapStateToProps(state) {
    return {
        popupState: state.inventory.popupState,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setPopupState: (data) => {
            dispatch(setPopupStateAction(data))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InventoryContainer);
