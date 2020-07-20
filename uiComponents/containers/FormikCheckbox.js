import React from 'react';
import CheckBox from "../components/CheckBox";

function FormikCheckbox(props) {
    return (
        <CheckBox
            onChangeCallback={props.onChangeCallback}
            defaultChecked={props.defaultChecked}
            name={props.name}
            onChange={props.onChange}
            onBlur={props.onBlur}
            type={props.checkType}/>
    );
}


export default FormikCheckbox;
