import React from 'react';
import TextFieldContainer from "../../../uiComponents/containers/TextFieldContainer";
import '../styles/personalInfo.scss'


const fieldArray = [
    {placeholder: 'Общий', label: 'Языки', fieldKey: 'languages'},
    {placeholder: 'Ученик', label: 'Предыстория', fieldKey: 'background'},
    {placeholder: 'Человек', label: 'Раса', fieldKey: 'race'},
    {placeholder: 'Нейтральный', label: 'Мировозрение', fieldKey: 'worldview'},
    {placeholder: 'Маг, Воин', label: 'Классы', fieldKey: 'classes'},
]

const PersonalInfoContainer = React.memo((props) => {
    const fieldElems = fieldArray.map(el => (
        <TextFieldContainer
            key={el.fieldKey}
            label={el.label}
            placeholder={el.placeholder}
            fieldKey={el.fieldKey}/>
    ))
    return(
        <>
            {
                !props.isMobile
                && <div className={`personalInfo__name`}>
                    <TextFieldContainer
                        placeholder={'Имя персонажа'}
                        fieldKey={`title`}/>
                </div>
            }

            {fieldElems}
        </>
    )
});

export default PersonalInfoContainer;