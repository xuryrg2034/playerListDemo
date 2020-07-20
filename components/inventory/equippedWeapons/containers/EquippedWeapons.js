import React from 'react';
import {connect} from "react-redux";
import EquippedWeapon from "../components/EquippedWeapon";
import '../styles/equippedWeapon.scss';

const EquippedWeapons = React.memo((props) => {
    const list = [];
    Object.keys(props.items).forEach(key => {
        if(
            props.items[key].attacks
            && props.items[key].equipped
            && Number(props.items[key].icon) === 0
        ) {
            list.push(
                <EquippedWeapon
                    key={key}
                    skillBonus={props.skillBonus}
                    playerCharacteristics={props.characteristics}
                    openPopup={props.setPopupState}
                    {...props.items[key]}/>
            );
        }
    });


    if(!list.length) return null;
    return(
        <div className={`equippedItem-wrapper`}>
            <div className={`equippedItem-table`}>
                <div className={`equippedItem__header`}>
                    <div className={`equippedItem__cell equippedItem__cell-title`} />
                    <div className={`equippedItem__cell equippedItem__cell-characteristic`} />
                    <div className={`equippedItem__cell equippedItem__cell-damage equippedItem__header_damage`}>Урон</div>
                    <div className={`equippedItem__cell equippedItem__cell-penetration equippedItem__header_penetration`}>Точн</div>
                </div>
                {list}
            </div>
        </div>
    )
});

function stateProps(state) {
    return {
        items: state.inventory.items,
        skillBonus: state.playerListInfo.list.skillBonus,
        characteristics: state.playerListInfo.list.characteristics
    }
}

export default connect(stateProps, null)(EquippedWeapons);