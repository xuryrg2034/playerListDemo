import React from "react";
import SavingThrowContainer from "../containers/SavingThrowsContainer";

const Characteristics = React.memo(({_id, title, modifierString, value, updateCharacteristic, itemsBonus}) => {
    if(isNaN(Number(value))) value = 0;
    return(
        <>
            <div className={`characteristicsBlock__row_left`}>
                <div className="characteristicsBlock__title">{ title.slice(0, 3) }</div>
                <div className="characteristicsBlock__value">
                    <input
                        type={`number`}
                        name={`characteristic-${_id}`}
                        onInput={(e) =>
                            updateCharacteristic({
                                id: _id,
                                value:
                                    e.target.value.trim()  === "" || isNaN(Number(e.target.value))
                                        ? 0
                                        : Number(e.target.value.trim())}
                            )}
                        onFocus={(e) => e.target.select()}
                        onBlur={(e) => {
                            if(e.target.value.trim() === "") e.target.value = 0;
                        }}
                        className={`characteristicsBlock__input`}
                        defaultValue={value}/>
                </div>
            </div>
            <div className={`characteristicsBlock__row_right`}>
                <div className="characteristicsBlock__equipmentBonus characteristicsBlock__lightText">{ itemsBonus || '' }</div>
                <div className="characteristicsBlock__modifierBonus characteristicsBlock__lightText">{ modifierString }</div>
                <div className="characteristicsBlock__savingThrowsBonus">
                    <SavingThrowContainer characteristicId={_id} characteristicModifier={modifierString}/>
                </div>
            </div>
        </>
    )
});



export default Characteristics;
