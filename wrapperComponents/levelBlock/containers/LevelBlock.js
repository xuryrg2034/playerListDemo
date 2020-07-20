import React from 'react';
import TextFieldContainer from "../../../uiComponents/containers/TextFieldContainer";
import {connect} from "react-redux";
import '../styles/levelBlock.scss'

const LevelBlock = React.memo((props) => {
    let expPercent = Number(props.currentExperience) / Number(props.maxExperience);

    if(expPercent < 0) {
        expPercent = 0;
    } else if(expPercent > 1) {
        expPercent = 1;
    }


    return(
        <div className={`levelBlock`}>
            <div className="levelBlock__level">
                <TextFieldContainer
                    type={`number`}
                    placeholder={`0`}
                    label={'Уровень'}
                    fieldKey={'level'}/>
            </div>
            <div className="levelBlock__expBar">
                <div className="levelBlock__expBar_bar" style={{transform: `scaleX(${expPercent})`}}></div>
            </div>
            <div className="levelBlock__expWrapper">
                <TextFieldContainer
                    type={`number`}
                    placeholder={`0`}
                    label={'Опыта'}
                    fieldKey={'currentExperience'}/>
            </div>
            <div className="levelBlock__expWrapper">
                <TextFieldContainer
                    type={`number`}
                    placeholder={`0`}
                    label={'До следующего'}
                    fieldKey={'maxExperience'}/>
            </div>
        </div>
    )
});

function stateProps(state) {
    return {
        currentExperience: state.playerListInfo.list.currentExperience,
        maxExperience: state.playerListInfo.list.maxExperience
    }
}

export default connect(stateProps, null)(LevelBlock);