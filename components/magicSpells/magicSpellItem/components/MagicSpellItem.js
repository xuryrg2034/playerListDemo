import React from "react";
import parse from 'html-react-parser';
import spellIconArray from "../../../../static/spellIconArray";
import '../../styles/magicSpellItem.scss'


const MagicSpellItem = React.memo((props) => {
    const iconUrl = spellIconArray.find(el => Number(el.id) === Number(props.icon));
    const classes = props.classes.trim() && props.classes.split(',').map((el, i) => <span key={i} className={`magicSpell__class`}>{el.trim()[0].toUpperCase() + el.trim().slice(1)}</span>)
    const additionalClasses = [];
    if(props.concentration) {
        additionalClasses.push('magicSpell-concentration');
    }
    if(props.equipped) {
        additionalClasses.push('magicSpell-equipped');
    }
    return(
        <div
            className={`magicSpell ${additionalClasses.join(' ')}`}
            onClick={() => props.openPopup({visible: true, type: 'update', spellId: props._id})}
        >
            <div className={`magicSpell__icon`}>
                <img src={iconUrl && iconUrl.display} alt={``}/>
            </div>
            <div className={`magicSpell__info`}>
                <div className={`magicSpell__title`}>{props.title || 'NO_NAME_SPELL'}</div>
                <div className={`magicSpell__description`}>
                    {classes}
                    <span className={`htmlContent`}>{props.shortDescription ? parse(props.shortDescription) : '-'}</span>
                </div>
            </div>
        </div>
    )
});

export default MagicSpellItem;
