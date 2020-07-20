import React from 'react';
import {connect} from "react-redux";
import TextFieldContainer from "../../../uiComponents/containers/TextFieldContainer";
import '../styles/fightInfoHealth.scss'

const FightInfoHealth = React.memo((props) => {

    let percentCurrentHealth = (props.currentHealth / props.maxHealth) * 100;

    if(percentCurrentHealth < 0) {
        percentCurrentHealth = 0
    } else if (percentCurrentHealth > 100) {
        percentCurrentHealth = 100
    }

    return(
        <div className={`healthBlock-wrapper`}>
            <div className="healthBlock__currentHealth">
                <div className="healthBlock__healthIcon">
                    <svg className={'healthBlock__healthIcon_svgMask'} width="47" height="41" viewBox="0 0 47 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <clipPath  id={`heartMask`}>
                            <path d="M47 13.9014C47 26.2589 28.9054 32.4105 23.9705 40.1C19.0356 32.4105 0.94104 26.2589 0.94104 13.9014C0.94104 0.268714 17.1971 -2.32909 23.9705 4.82522C30.7439 -2.32909 47 0.268715 47 13.9014Z" fill={`#fff`}/>
                        </clipPath>
                    </svg>
                    <div className={`healthBlock__healthIcon_heart`}>
                        <svg
                            style={{transform: `translateY(${100 - percentCurrentHealth}%)`}}
                            width="101"
                            height="44"
                            viewBox="0 0 101 44"
                            fill="none"
                        >
                            <path d="M0 44H50.439V4.29268C39.7073 4.29268 36.4878 0 25.2195 0C13.9512 0 10.7317 4.29268 0 4.29268V44Z" fill="#9C4646"/>
                            <path d="M49.5 44H100.877V4.29268C90.1452 4.29268 86.9257 0 75.6574 0C64.3891 0 60.2317 4.28149 49.5 4.28149V24V44Z" fill="#9C4646"/>
                        </svg>
                    </div>
                </div>
                <div className={`healthBlock__currentHealth_inputWrapper`}>
                    <div className={`playerListContainer__personalInfo_item`}>
                        <TextFieldContainer
                            type={`number`}
                            placeholder={`0`}
                            label={'Хиты'}
                            fieldKey={'currentHealth'}/>
                    </div>
                </div>
            </div>
            <div className={`playerListContainer__personalInfo_item`}>
                <TextFieldContainer
                    type={`number`}
                    placeholder={`0`}
                    label={'Максимум'}
                    fieldKey={'maxHealth'}/>
            </div>
            <div className={`playerListContainer__personalInfo_item`}>
                <TextFieldContainer
                    type={`number`}
                    placeholder={`0`}
                    label={'Бонусное'}
                    fieldKey={'temporaryHealth'}/>
            </div>
        </div>
    )
});


function stateProps(state) {
    return {
        maxHealth: state.playerListInfo.list.maxHealth,
        currentHealth: state.playerListInfo.list.currentHealth
    }
}


export default connect(stateProps, null)(FightInfoHealth);