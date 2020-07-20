import React from 'react';
import itemIconArray from "../../../../static/itemIconArray";
import parse from 'html-react-parser';

const Item = React.memo((props) => {
    return(
        <div
            className={`item ${props.equipped ? 'item-equipped' : ''}`}
            onClick={() => {props.openPopup({visible: true, type: 'update', itemId: props._id})}}
        >
            <div className={`item__icon`}>
                <img src={!isNaN(props.icon) ? itemIconArray[props.icon].display : null} alt=""/>
            </div>
            <div className={`item__info`}>
                <div className={`item__title`}>{props.title || 'NO_NAME_ITEM'}</div>
                <div className={`item__description`}>{props.shortDescription ? parse(props.shortDescription) : '-'}</div>
            </div>
        </div>
    )
});

export default Item;