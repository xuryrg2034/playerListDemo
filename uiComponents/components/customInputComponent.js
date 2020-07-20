import React, {useEffect, useState} from 'react';
import '../styles/customInputComponent.scss'

const CustomInputComponent = React.memo((props) => {
    const [isFocus, setIsFocus] = useState(false);
    const inputEl = React.createRef();

    useEffect(() => {
        const el = inputEl.current;

        el.addEventListener('focus', () => {
            setIsFocus(true);
        });

        el.addEventListener('blur', () => {
            setIsFocus(false);
        });

        el.addEventListener('keypress', (e) => {
            if(e.keyCode === 13) {
                setIsFocus(false);
                el.blur();
            }
        })

    }, [inputEl]);

    return(
        <label className={`customElem__label ${props.label ? '' : 'customElem__label-withOutLabel'} ${isFocus ? 'customElem__label-focus': ''}`}>
            {props.label && <span className="customElem__label_text">{props.label}</span>}
            <div className="customElem__input-wrapper">
                <input
                    ref={inputEl}
                    autoComplete={'off'}
                    className="customElem__input"
                    // name={props.name}
                    // placeholder={props.placeholder}
                    // type={props.type}
                    // onChange={props.onChange}
                    // onInput={props.onInput}
                    // onBlur={props.onBlur}
                    // onFocus={props.onFocus}
                    // maxLength={props.maxLength}
                    // value={props.value}
                    {...props}
                />
            </div>
        </label>
    )
});

CustomInputComponent.defaultProps = {
    type: "text",
    label: null,
    onChange: null,
    onInput: null,
    onBlur: null,
    onFocus: null,
    placeholder: null,
    name: 'noName',
    maxLength: null,
    // value: null,
    // defaultValue: null
}

export default CustomInputComponent;