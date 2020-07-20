import React from 'react';
import '../styles/customCheckBox.scss';

const CheckBox = ({type, defaultChecked, onChange, name, onBlur}) => {

    const element = React.createRef();
    const classes = [
        `${type ? 'customCheckbox__ui_check-'+type : ''}`,
        `${defaultChecked ? 'customCheckbox__ui_check-active' : ''}`
    ];

    return(
        <label className={`customCheckbox__input-wrapper`}>
            <input
                type="checkbox"
                name={name || 'noName'}
                className="customCheckbox__input"
                defaultChecked={defaultChecked}
                onChange={onChange}
                onBlur={onBlur}
                ref={element}
            />
            <div className={`customCheckbox__ui`}>
                <div className={`customCheckbox__ui_check ${classes.join(' ')}`} />
            </div>
        </label>
    )
};


export default CheckBox;
