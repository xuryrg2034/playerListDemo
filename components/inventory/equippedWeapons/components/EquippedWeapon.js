import React from 'react';
import characteristicModifier from "../../../../utils/characteristicModifier";

const EquippedWeapon = React.memo((props) => {
    return(
        props.attacks.map((attack, i) => {
            const statEl = props.playerCharacteristics.find(stat => stat._id === attack.statId) || {};
            const statBonus = characteristicModifier(statEl.value);
            const damageBonus = attack.damage || 0;
            let finalDamageBonus = Number(damageBonus) + Number(statBonus);

            const penetrationBonus = attack.penetration || 0;
            let finalPenetrationBonus = Number(penetrationBonus) + Number(statBonus);
            if(props.wield) {
                finalPenetrationBonus = Number(penetrationBonus) + Number(statBonus) + Number(props.skillBonus);
            }

            if(isNaN(finalDamageBonus)) finalDamageBonus = 0;
            if(isNaN(finalPenetrationBonus)) finalPenetrationBonus = 0;

            return(
                <div key={i} className={`equippedItem`} onClick={() => props.openPopup({visible: true, type: 'update', itemId: props._id})}>
                    <div className={`equippedItem__cell equippedItem__cell-title equippedItem__title`}>{props.title}</div>
                    <div className={`equippedItem__cell equippedItem__cell-characteristic equippedItem__characteristic`}>{statEl.title ? statEl.title.slice(0, 3).toUpperCase() : ''}</div>
                    <div className={`equippedItem__cell equippedItem__cell-damage equippedItem__damage`}>{`${attack.dice}${finalDamageBonus > 0 ? `+${finalDamageBonus}` : finalDamageBonus}`}</div>
                    <div className={`equippedItem__cell equippedItem__cell-penetration equippedItem__penetration`}>{finalPenetrationBonus > 0 ? `+${finalPenetrationBonus}` : finalPenetrationBonus}</div>
                </div>
            )
        })
    )
});

export default EquippedWeapon;