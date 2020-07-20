import React from 'react';
import {connect} from "react-redux";
import FormMagicSpellListContainer from "../../../components/magicSpells/form/containers/FormMagicSpellPopupContainer"
import MagicSpellsListContainer
    from "../../../components/magicSpells/magicSpellList/containers/MagicSpellsListContainer";
import constantsForDevice from "../../../static/constantsForDevice";
import setPopupStateAction from "../../../components/magicSpells/actions/setPopupStateAction";
import '../styles/spellBookMobile.scss';

const SpellBookMobileContainer = (props) => {
    const isMobile = props.deviceType === constantsForDevice.mobile;
    return(
        <div className={`spellBookMobile`}>
            <div className={`headerMobile headerMobile-withTitle headerMobile-paddingNull`}>
                <div className={`btnGoBack btnGoBack-maxwidth`} onClick={() => props.setComponentId(0)}>{props.characterName}</div>
                <div className={`headerMobile__title`}>Заклинания</div>
                <div  className={`headerMobile__rightBtn equippedItem__btnCreate`} onClick={() => props.openPopupAction({visible: true, type: 'create'})}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.7 0H7.3V7.3H0V8.7H7.3V16H8.7V8.7H16V7.3H8.7V0Z" fill="#38302C" fillOpacity="0.4"/>
                    </svg>
                </div>
            </div>
            <MagicSpellsListContainer isMobile={isMobile}/>
            {props.popupVisible && <FormMagicSpellListContainer isMobile={isMobile}/>}
        </div>
    )
};


function stateProps(state) {
    return {
        popupVisible: state.magicSpells.popupState.visible,
        deviceType: state.deviceInfo.device.type
    }
}

function dispatchProps(dispatch) {
    return {
        openPopupAction: (data) => {
            dispatch(setPopupStateAction(data));
        },
    }
}

export default connect(stateProps, dispatchProps)(SpellBookMobileContainer);
