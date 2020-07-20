import React from 'react';
import {Field, Formik} from "formik";
import CustomInputComponent from "../../../../uiComponents/components/customInputComponent";
import CustomSelect from "../../../../uiComponents/containers/CustomSelectOfFormik";
import characteristicModifier from "../../../../utils/characteristicModifier";

const MagicClassItem = React.memo((props) => {
    const state = {
        title: props.title || '',
        characteristic: props.characteristic || '',
        savingThrows: props.savingThrows || '',
        penetration: props.penetration || '',
        // savingThrowsEditable: props.savingThrowsEditable,
        // penetrationEditable: props.penetrationEditable
    }

    const characteristicsArray = props.characteristics.map(el => ({
        id: el._id,
        display: el.title
    }));

    const savingThrows = (statId) => {
        return Number(props.skillBonus) + 8 + Number(characteristicModifier(props.characteristics.find(el => el._id === statId).value));
    }

    const penetrationBonus = (statId) => {
        return Number(props.skillBonus) + Number(characteristicModifier(props.characteristics.find(el => el._id === statId).value));
    }

    let savingThrowsValue = (props.characteristic && savingThrows(props.characteristic)) || props.savingThrows;
    let penetrationValue = (props.characteristic && penetrationBonus(props.characteristic)) || props.penetration;

    return(
        <div className={`magicClasses__item`}>
            <Formik
                initialValues={{...state}}
                onSubmit={(values) => props.onSubmit(values, props._id)}
                validateOnBlur={false}
                validateOnChange={false}
            >
                {(formikProps) => {
                    return(
                        <>
                            <div className={`magicClasses__classTitle`}>
                                <Field
                                    name={`title`}
                                    placeholder={`Класс`}
                                    value={formikProps.values.title}
                                    onBlur={formikProps.submitForm}
                                    as={CustomInputComponent}/>
                            </div>
                            <div className={`magicClasses__item_text magicClasses__characteristic`}>
                                <CustomSelect
                                    name={`characteristic`}
                                    options={characteristicsArray}
                                    value={formikProps.values.characteristic}
                                    placeholder={`...`}
                                    setFieldValue={(field, value) => {
                                        formikProps.setFieldValue(field, value);
                                        formikProps.setFieldValue('savingThrows', savingThrows(value));
                                        formikProps.setFieldValue('penetration', penetrationBonus(value));
                                    }}
                                    onCloseCallback={formikProps.submitForm}
                                    formatDisplay={string => string.slice(0, 3).toUpperCase()}
                                />
                            </div>
                            <div className={`magicClasses__item_text magicClasses__savingThrow`}>{Number(savingThrowsValue) > 0 ? `+${savingThrowsValue}` : savingThrowsValue}</div>
                            <div className={`magicClasses__item_text magicClasses__penetration`}>{Number(penetrationValue) > 0 ? `+${penetrationValue}` : penetrationValue}</div>
                            <div className={`magicClasses__item_btnDelete`} onClick={() => props.deleteMagicClass(props._id)}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18.1518 6.83811L17.1619 5.84816L12 11.01L6.83812 5.84816L5.84817 6.83811L11.0101 12L5.84817 17.1619L6.83812 18.1518L12 12.9899L17.1619 18.1518L18.1518 17.1619L12.9899 12L18.1518 6.83811Z" fill="#38302C" fillOpacity="0.4"/>
                                </svg>
                            </div>
                        </>
                    )
                }}
            </Formik>
        </div>
    )
});

export default MagicClassItem;