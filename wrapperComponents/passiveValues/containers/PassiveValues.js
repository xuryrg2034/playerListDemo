import React from 'react';
import TextFieldContainer from "../../../uiComponents/containers/TextFieldContainer";
import '../styles/passiveValues.scss'

const PassiveValues = React.memo((props) => {
    return(
        <div className={`passiveValues`}>
            <div className="passiveValues__inputWrapper">
                <TextFieldContainer
                    type={`number`}
                    placeholder={`0`}
                    label={'Бонус мастерства'}
                    fieldKey={'skillBonus'}/>
            </div>
            <div className="passiveValues__inputWrapper">
                <TextFieldContainer
                    type={`number`}
                    placeholder={`0`}
                    label={'Пассивная внимательность'}
                    fieldKey={'passiveAttentiveness'}/>
            </div>
        </div>
    )
});


export default PassiveValues;