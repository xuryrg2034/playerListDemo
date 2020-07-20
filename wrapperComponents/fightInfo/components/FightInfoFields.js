import React from 'react';
import TextFieldContainer from "../../../uiComponents/containers/TextFieldContainer";
import '../styles/fightInfoFields.scss'

const fields = [
    { key: 'armorClass', title: 'Класс брони', placeholder: '0', className: 'playerListContainer__fightInfo_armorClass' },
    { key: 'initiative', title: 'Инициатива', placeholder: '0', className: 'playerListContainer__fightInfo_initiative' },
    { key: 'speed', title: 'Скорость', placeholder: '0', className: 'playerListContainer__fightInfo_speed' },
];


const FightInfoFields = React.memo(() => {
    return fields.map(el => (
        <div key={el.key} className={`playerListContainer__personalInfo_item ${el.className}`}>
            <TextFieldContainer
                type={`number`}
                placeholder={el.placeholder}
                label={el.title}
                fieldKey={el.key}/>
        </div>
    ))
})

export default FightInfoFields;
