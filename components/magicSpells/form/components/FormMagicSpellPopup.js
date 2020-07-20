import React from 'react';
import {Formik, Field} from "formik";
import CustomSelect from "../../../../uiComponents/containers/CustomSelectOfFormik";
import CKEditorComponent from "../../../textEditor/containers/ckEditorComponent";
import CustomInputComponent from "../../../../uiComponents/components/customInputComponent";
import spellIconArray from "../../../../static/spellIconArray";
import CustomIconSelect from "../../../../uiComponents/containers/CustomIconSelectByFormik";
import FormikCheckbox from "../../../../uiComponents/containers/FormikCheckbox";

const FormMagicSpellPopup = React.memo((props) => {
    const initialState = {
        title: props.magicSpell.title || '',
        description: props.magicSpell.description || '',
        level: Number(props.magicSpell.level) || 0,
        icon: isNaN(props.magicSpell.icon) ? spellIconArray[0].id : Number(props.magicSpell.icon),
        equipped: props.magicSpell.equipped || false,
        concentration: props.magicSpell.concentration || false,
        classes: props.magicSpell.classes || '',
        shortDescription: props.magicSpell.shortDescription || ''
    };

    const arrayCellsOfMagic = props.cellsOfMagic.map(val => (
        {
            id: val.level,
            display: val.level === 0 ? `Заговор` : `Уровень ${val.level}`
        }
    ));


    return(
        <Formik
            initialValues={initialState}
            onSubmit={props.onSubmit}
            validateOnBlur={false}
            validateOnChange={false}
        >
            {(formikProps) => {
                return(
                    <div className={`magicSpellPopup__form`}>
                        <div className="magicSpellPopup__header">
                            <div className="magicSpellPopup__header_left">
                                <CustomIconSelect
                                    name="icon"
                                    options={spellIconArray}
                                    setFieldValue={formikProps.setFieldValue}
                                    onChangeCallback={formikProps.submitForm}
                                    value={formikProps.values.icon}/>
                            </div>
                            <div className="magicSpellPopup__header_right">
                                <div className={`popupBlock__inputTitle-wrapper`}>
                                    <Field
                                        name="title"
                                        placeholder="Название заклинания"
                                        value={formikProps.values.title}
                                        onBlur={formikProps.submitForm}
                                        as={CustomInputComponent}/>
                                </div>

                                <label className={'formikLabelWithCheck'}>
                                    <Field
                                        name={'equipped'}
                                        defaultChecked={formikProps.values.equipped}
                                        onChange={(e) => {
                                            formikProps.setFieldValue('equipped', e.target.checked)
                                            formikProps.submitForm();
                                        }}
                                        as={FormikCheckbox}/>
                                    <div className={`formikLabelWithCheck__text`}>Подготовить</div>
                                </label>
                                <label className={'formikLabelWithCheck'}>
                                    <Field
                                        name={'concentration'}
                                        defaultChecked={formikProps.values.concentration}
                                        onChange={(e) => {
                                            formikProps.setFieldValue('concentration', e.target.checked)
                                            formikProps.submitForm();
                                        }}
                                        as={FormikCheckbox}/>
                                    <div className={`formikLabelWithCheck__text`}>Концентрация</div>
                                </label>
                            </div>
                        </div>
                        <div className={`magicSpellPopup__form_section`}>
                            <div className={`magicSpellPopup__form_left`}>
                                <div className={`popupBlock__select`}>
                                    <CustomSelect
                                        name="level"
                                        label={'Круг'}
                                        options={arrayCellsOfMagic}
                                        value={formikProps.values.level}
                                        setFieldValue={formikProps.setFieldValue}
                                        onCloseCallback={formikProps.submitForm}/>
                                </div>

                                <div className={`popupBlock__select`}>
                                    <Field
                                        name="classes"
                                        label={`Классы`}
                                        value={formikProps.values.classes}
                                        onBlur={formikProps.submitForm}
                                        as={CustomInputComponent}/>
                                </div>

                                <div className={`popupBlock__shortDescription`}>
                                <Field
                                    value={formikProps.values.shortDescription}
                                    name="shortDescription"
                                    placeholder="Краткое описание..."
                                    onBlur={(event, editor) => {
                                        formikProps.setFieldValue('shortDescription', editor.getData());
                                        formikProps.submitForm();
                                    }}
                                    as={CKEditorComponent}/>
                                </div>
                                {
                                    !props.isMobile
                                    && <div
                                        className="popupBlock__submitBtn"
                                        onClick={props.deleteMagicSpell}
                                        disabled={props.disabled}
                                    >Удалить заклинание</div>
                                }
                            </div>

                            <div className={`magicSpellPopup__form_right`}>
                                <Field
                                    value={formikProps.values.description}
                                    name="description"
                                    placeholder="Добавить описание..."
                                    onBlur={(event, editor) => {
                                        formikProps.setFieldValue('description', editor.getData())
                                        formikProps.submitForm();
                                    }}
                                    as={CKEditorComponent}/>
                            </div>
                        </div>
                    </div>
                )
            }}
        </Formik>
    )
});

export default FormMagicSpellPopup;
