import React from 'react';
import setPopupStateAction from "../../../components/inventory/actions/setPopupStateAction";
import {connect} from "react-redux";
import EquippedWeapons from "../../../components/inventory/equippedWeapons/containers/EquippedWeapons";
import ItemsContainer from "../../../components/inventory/items/containers/ItemsContainer";
import CreateFormContainer from "../../../components/inventory/form/containers/FormItemContainer";
import constantsForDevice from "../../../static/constantsForDevice";
import '../styles/inventoryMobile.scss';


const InventoryMobile = (props) => {
    const isMobile = props.deviceType === constantsForDevice.mobile;
    return(
        <div className={`inventoryMobile`}>
            <div className={`headerMobile headerMobile-withTitle`}>
                <div className={`btnGoBack btnGoBack-maxwidth`} onClick={() => props.setComponentId(0)}>{props.characterName}</div>
                <div className={`headerMobile__title`}>Инвентарь</div>
                <div  className={`headerMobile__rightBtn equippedItem__btnCreate`} onClick={() => {props.setPopupState({visible: true, type: 'create'})}}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.7 0H7.3V7.3H0V8.7H7.3V16H8.7V8.7H16V7.3H8.7V0Z" fill="#38302C" fillOpacity="0.4"/>
                    </svg>
                </div>
            </div>
            <EquippedWeapons setPopupState={props.setPopupState}/>
            <ItemsContainer setPopupState={props.setPopupState}/>
            {props.popupState.visible && <CreateFormContainer isMobile={isMobile}/>}
        </div>
    )
};

function mapStateToProps(state) {
    return {
        popupState: state.inventory.popupState,
        deviceType: state.deviceInfo.device.type
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setPopupState: (data) => {
            dispatch(setPopupStateAction(data))
        }
    }
}

export default connect(mapStateToProps,  mapDispatchToProps)(InventoryMobile);