import React, { useState } from 'react';
import {connect} from "react-redux";
import updateTextFieldAction from "../actions/updateTextFieldAction";
import { Formik, Field } from "formik";
import CustomInputComponent from "../components/customInputComponent";

const TextFieldContainer = React.memo((props) => {
    const [defaultValue, setDefaultValue] = useState(props.list[props.fieldKey]);

    const initialState = {
        text: defaultValue
    };

    const submitForm = async (values) => {
        if(defaultValue === values.text) return false;
        const resp = await props.updateTextField({text: values.text, listId: props.listId, fieldKey: props.fieldKey});
        if(resp.success) setDefaultValue(values.text);
    };

    return(
        <Formik
            initialValues={initialState}
            onSubmit={submitForm}
        >
            {(formikProps) => {
                return(
                    <Field
                        name={'text'}
                        type={props.type || 'text'}
                        label={props.label || null}
                        placeholder={props.placeholder || null}
                        value={formikProps.values.text}
                        onBlur={formikProps.submitForm}
                        maxLength={props.maxLength}
                        as={CustomInputComponent}/>
                )
            }}
        </Formik>
   )
});




function mapStateToProps(state) {
    return {
        listId:  state.playerListInfo.list._id,
        list: state.playerListInfo.list,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateTextField: ({text, listId, fieldKey}) => {
            const objData = {
                value: text,
                fieldKey,
                listId
            };

            return dispatch(updateTextFieldAction(objData))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TextFieldContainer);
