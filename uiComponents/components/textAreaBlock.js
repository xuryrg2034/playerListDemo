


import React  from 'react';



const TextAreaBlock = React.memo(({text, changeValue}) => {
    return(
        <>
            <div>{text}</div>
            <textarea
                defaultValue={text}
                onInput={(e) => changeValue(e)}
            />
        </>
    )
});

export default TextAreaBlock;
