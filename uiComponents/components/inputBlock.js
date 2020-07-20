


import React  from 'react';



const InputBlock = React.memo(({text, changeValue, triggerSubmitForm}) => {
    return(
        <input
            onBlur={(e) => triggerSubmitForm(e)}
            className="inputComponent__input"
            type="text"
            onInput={(e) => changeValue(e)}
            defaultValue={text}
        />
    )
});

export default InputBlock;
