import React from 'react';
import CustomSelect from "../../../../uiComponents/containers/CustomSelectOfFormik";
import CustomInputComponent from "../../../../uiComponents/components/customInputComponent";


const CharacteristicBonus = React.memo((props) => {
    return(
        <div className={`itemBonusBlock__item`}>
            <CustomSelect
                name="characteristics"
                options={props.selectOptions}
                setFieldValue={(fieldKey, statId) => props.updateCharacteristicBonus(props.setFieldValue, props.characteristics, props.indexInArray, {statId})}
                placeholder="Характеристика"
                onCloseCallback={props.submitForm}
                value={props.statId}
                btnWithinList={{
                    btnText: 'Удалить',
                    callback: () => {
                        props.deleteCharacteristicBonus(
                            props.setFieldValue,
                            props.characteristics,
                            props.indexInArray
                        )
                        props.submitForm()
                    }
                }}
            />

            <CustomInputComponent
                disabled={!props.statId}
                readOnly={!props.statId}
                value={props.value || ''}
                placeholder={0}
                type={`number`}
                onChange={(e) => {
                    props.updateCharacteristicBonus(
                        props.setFieldValue,
                        props.characteristics,
                        props.indexInArray,
                        {value: e.target.value}
                    );
                    props.submitForm();
                }}
            />
        </div>
    )
});

export default CharacteristicBonus;