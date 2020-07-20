import React from "react";
import {Formik, Field} from "formik";
import * as Yup from "yup";
import CKEditorComponent from "../../textEditor/containers/ckEditorComponent";
import CustomInputComponent from "../../../uiComponents/components/customInputComponent";


const Schema = Yup.object().shape({
    title: Yup.string().trim(),
    description: Yup.string().trim(),
});


const ListElementForm = React.memo(({
    updateInfo,
    title,
    inputValue,
    description,
    inputTitlePlaceholder,
    deleteElemInfoAction,
    id,
    listType,
    isMobile}) => {

    return(
        <Formik
            initialValues={{title: inputValue, description}}
            validateOnBlur={false}
            validateOnChange={false}
            validationSchema={Schema}
            onSubmit={(val) => updateInfo(val)}>
            {(props) => {
                return(
                    <>
                        <div className={'popupBlock__inputTitle-wrapper'}>
                            <Field
                                placeholder={inputTitlePlaceholder}
                                type="text"
                                name="title"
                                value={props.values.title}
                                onBlur={props.submitForm}
                                as={CustomInputComponent}/>
                        </div>
                        <div className="listPopup__title">{title}</div>
                        <div className={`listPopup__description`}>
                            <Field
                                placeholder="Добавить описание..."
                                name="description"
                                value={props.values.description}
                                as={CKEditorComponent}
                                onBlur={(event, editor) => {
                                    props.setFieldValue('description', editor.getData());
                                    props.submitForm();
                                } }
                            />
                        </div>
                        {
                            !isMobile && <div
                                className="popupBlock__submitBtn"
                                onClick={() => deleteElemInfoAction({id, listType})}
                            >Удалить умение</div>
                        }

                    </>
                )
            }}
        </Formik>
    )
});



export default ListElementForm;
