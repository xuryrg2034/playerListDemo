import React from 'react';


const TabsBtn = React.memo((props) => {
    return(
        props.tabs.map(el => (
            <div
                key={el.id}
                className={`tabBtn__item ${el.id === props.currentEditor ? 'tabBtn__item-active' : ''}`}
                onClick={() => props.changeEditor(el.id)}
            >
                <span className="tabBtn__item_text">{el.title}</span>
            </div>
        ))
    )
})

export default TabsBtn;