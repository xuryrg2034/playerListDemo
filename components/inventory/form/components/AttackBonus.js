import React from 'react';
import CustomSelect from "../../../../uiComponents/containers/CustomSelectOfFormik";
import CustomInputComponent from "../../../../uiComponents/components/customInputComponent";


const AttackBonus = React.memo((props) => {
    return(
        <div className={`itemBonusBlock__item itemBonusBlock__table_row itemBonusBlock__attack ${props.arrayLength - 1 === props.indexInArray ? 'itemBonusBlock__table_row-last' : ''}`}>
            <div className={`itemBonusBlock__table_cell itemBonusBlock__attack_characteristic`}>
                <CustomSelect
                    name="characteristics"
                    options={props.selectOptions}
                    setFieldValue={(fieldKey, statId) => props.updateAttackBonus(props.setFieldValue, props.attacks, props.indexInArray, {statId})}
                    placeholder="Хар-ка"
                    onCloseCallback={props.submitForm}
                    value={props.statId}
                    formatDisplay={string => string.slice(0, 3).toUpperCase()}
                    btnWithinList={{
                        btnText: 'Удалить',
                        callback: () => {
                            props.deleteAttackBonus(
                                props.setFieldValue,
                                props.attacks,
                                props.indexInArray
                            )
                            props.submitForm();
                        }
                    }}
                />
            </div>
            <div className={`itemBonusBlock__table_cell itemBonusBlock__attack_dice`}>
                <CustomInputComponent
                    disabled={!props.statId}
                    readOnly={!props.statId}
                    value={props.dice || ''}
                    placeholder={0}
                    type={`text`}
                    onChange={(e) => {
                        props.updateAttackBonus(
                            props.setFieldValue,
                            props.attacks,
                            props.indexInArray,
                            {dice: e.target.value}
                        )
                        props.submitForm();
                    }}
                />
            </div>
            <div className={`itemBonusBlock__table_cell itemBonusBlock__attack_damage`}>
                <CustomInputComponent
                    disabled={!props.statId}
                    readOnly={!props.statId}
                    value={props.damage || ''}
                    placeholder={0}
                    type={`number`}
                    onChange={(e) => {
                        props.updateAttackBonus(
                            props.setFieldValue,
                            props.attacks,
                            props.indexInArray,
                            {damage: e.target.value}
                        )
                        props.submitForm();
                    }}
                />
            </div>
            <div className={`itemBonusBlock__table_cell itemBonusBlock__attack_penetration`}>
                <CustomInputComponent
                    disabled={!props.statId}
                    readOnly={!props.statId}
                    value={props.damage || ''}
                    placeholder={0}
                    type={`number`}
                    onChange={(e) => {
                        props.updateAttackBonus(
                            props.setFieldValue,
                            props.attacks,
                            props.indexInArray,
                            {damage: e.target.value}
                        )
                        props.submitForm();
                    }}
                />
            </div>
        </div>
    )
});

export default AttackBonus;