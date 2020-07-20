import React from 'react';
import {Field, Form, Formik} from "formik";
import CustomInputComponent from "../../../uiComponents/components/customInputComponent";
import CKEditorComponent from "../../textEditor/containers/ckEditorComponent";
import * as Yup from "yup";
import {regExpEmail} from "../../../utils/regExp";

const initialValues = {
    email: '',
    description: ''
};


const Schema = Yup.object().shape({
    email:
        Yup.string()
            .trim()
            .matches(regExpEmail, 'Неверный формат email')
            .required("Email обязательное поле")
});

const SupportForm = (props) => (
    <Formik
        initialValues={initialValues}
        onSubmit={props.onSubmit}
        validationSchema={Schema}
        validateOnBlur={false}
        validateOnChange={false}
    >
        {(formikProps) => {

            const {errors, isSubmitting} = formikProps;

            //Если есть ошибки, отправляю их в store а далее компонент с ошибкой отрисуется
            if(isSubmitting) {
                for (let error in errors) {
                    if(errors.hasOwnProperty(error) && errors[error].trim()) {
                        props.formError(errors[error].trim());
                        return false;
                    }
                }
            }

            return(
                <div className={`popupBlock supportForm`}>
                    <div className="popupBlock__btnClose" onClick={() => props.toggleFormVisible(false)}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M2.90909 0L0 2.90909L5.09091 8L0 13.0909L2.90909 16L8 10.9091L13.0909 16L16 13.0909L10.9091 8L16 2.90909L13.0909 0L8 5.09091L2.90909 0Z"
                                fill="#38302C"/>
                        </svg>
                    </div>

                    <Form>
                        <div className={`supportForm__email`}>
                            <Field
                                placeholder={'hero@email.com'}
                                type={`text`}
                                name={`email`}
                                value={formikProps.values.email}
                                onBlur={() => {formikProps.setFieldError('email', '')}}
                                as={CustomInputComponent}
                            />
                        </div>
                        <div className={`supportForm__description`}>
                            <Field
                                placeholder="Напишите ваш вопрос..."
                                name={`description`}
                                value={formikProps.values.description}
                                as={CKEditorComponent}
                                onBlur={(event, editor) => {
                                    formikProps.setFieldValue('description', editor.getData());
                                }}
                            />
                        </div>
                        <button type={`submit`} className={`popupBlock__submitBtn`}>Отправить</button>
                    </Form>
                </div>
            )
        }}
    </Formik>
);

export default SupportForm;