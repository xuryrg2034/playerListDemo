import React from 'react';
import {Field} from "formik";
import CKEditorComponent from "../../../textEditor/containers/ckEditorComponent";
import CustomIconSelect from "../../../../uiComponents/containers/CustomIconSelectByFormik";
import CustomInputComponent from "../../../../uiComponents/components/customInputComponent";
import FormikCheckbox from "../../../../uiComponents/containers/FormikCheckbox";
import itemIconArray from "../../../../static/itemIconArray";
import CharacteristicBonus from "./CharacteristicBonus";
import AttackBonus from "./AttackBonus";

const FormItem = React.memo((props) => {
    const {formikProps} = props;
    const selectOptions = props.characteristics.map(val => ({id: val._id, display: val.title}));
    return(
        <div className={`magicSpellPopup__form`}>
            <div className={`magicSpellPopup__header`}>
                <div className={`magicSpellPopup__header_left`}>
                    <CustomIconSelect
                        name="icon"
                        options={itemIconArray}
                        setFieldValue={formikProps.setFieldValue}
                        onChangeCallback={formikProps.submitForm}
                        value={formikProps.values.icon}/>
                </div>
                <div className={`magicSpellPopup__header_right`}>
                    <div className={`popupBlock__inputTitle-wrapper`}>
                        <Field
                            name="title"
                            placeholder="Название предмета"
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
                        <div className={`formikLabelWithCheck__text`}>Экипировать</div>
                    </label>
                    <label className={'formikLabelWithCheck'}>
                        <Field
                            name={'wield'}
                            defaultChecked={formikProps.values.wield}
                            onChange={(e) => {
                                formikProps.setFieldValue('wield', e.target.checked)
                                formikProps.submitForm();
                            }}
                            as={FormikCheckbox}/>
                        <div className={`formikLabelWithCheck__text`}>Владение</div>
                    </label>
                </div>
            </div>
            <div className={`magicSpellPopup__form_section`}>
                <div className={`magicSpellPopup__form_left`}>
                    <div className={`itemBonusBlock`}>
                        <div
                            className={`itemBonusBlock__btn`}
                            onClick={()  => props.addAttackBonus(formikProps.setFieldValue, formikProps.values.attacks)}>
                            <span>Атаки</span>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.7 0H7.3V7.3H0V8.7H7.3V16H8.7V8.7H16V7.3H8.7V0Z" fill="#38302C" fillOpacity="0.4"/>
                            </svg>
                        </div>
                        <div className={`itemBonusBlock__table`}>
                            {formikProps.values.attacks.map((el, index, array) =>
                                <AttackBonus
                                    indexInArray={index}
                                    key={index}
                                    setFieldValue={formikProps.setFieldValue}
                                    updateAttackBonus={props.updateAttackBonus}
                                    deleteAttackBonus={props.deleteAttackBonus}
                                    selectOptions={selectOptions}
                                    attacks={formikProps.values.attacks}
                                    submitForm={formikProps.submitForm}
                                    arrayLength={array.length}
                                    {...el}
                                />)
                            }
                            {
                                !!formikProps.values.attacks.length
                                && <div className={`itemBonusBlock__table_row itemBonusBlock__table_header`}>
                                    <div className={`itemBonusBlock__table_cell itemBonusBlock__attack_characteristic`}/>
                                    <div className={`itemBonusBlock__table_cell itemBonusBlock__attack_dice`}>Кости</div>
                                    <div className={`itemBonusBlock__table_cell itemBonusBlock__attack_damage`}>Урон</div>
                                    <div className={`itemBonusBlock__table_cell itemBonusBlock__attack_penetration`}>Точн</div>
                                </div>
                            }

                        </div>
                    </div>
                    <div className={`itemBonusBlock`}>
                        <div
                            className={`itemBonusBlock__btn`}
                            onClick={()  => props.addCharacteristicBonus(formikProps.setFieldValue, formikProps.values.characteristics)}>
                            <span>Бонусы к параметрам</span>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.7 0H7.3V7.3H0V8.7H7.3V16H8.7V8.7H16V7.3H8.7V0Z" fill="#38302C" fillOpacity="0.4"/>
                            </svg>
                        </div>
                        {formikProps.values.characteristics.map((el, index) =>
                            <CharacteristicBonus
                                indexInArray={index}
                                key={index}
                                setFieldValue={formikProps.setFieldValue}
                                characteristics={formikProps.values.characteristics}
                                updateCharacteristicBonus={props.updateCharacteristicBonus}
                                deleteCharacteristicBonus={props.deleteCharacteristicBonus}
                                selectOptions={selectOptions}
                                submitForm={formikProps.submitForm}
                                {...el}
                            />)
                        }
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

                    {!props.isMobile && <div className="popupBlock__submitBtn" onClick={props.deleteItem}>Удалить предмет</div>}
                </div>
                <div className="magicSpellPopup__form_right">
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
});

export default FormItem;
