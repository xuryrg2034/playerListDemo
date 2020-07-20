import React, { useState } from "react";
import characteristicModifier from "../../../utils/characteristicModifier";
import {connect} from "react-redux";
import updateSkillsAction from "../actions/updateSkillsAction";
import CheckBox from "../../../uiComponents/components/CheckBox";



const Skills = React.memo((props) => {
    const [disabled, setDisabled] = useState(false);

    const updateSkills = async (data) => {
        if(disabled) return false;

        let competenceReset = {type: 'competence', value: false};
        let values = false;

        //Дополняю запрос, что бы сбросить и компетенцию, если она стояла
        if(props.competence && data.type === 'wield' && !data.value) {
            values = [data, competenceReset];
        }

        const obj = {
            values: values || [data],
            listId: props.listId,
            statId: props.id
        }

        setDisabled(true);
        await props.updateSkillsAction(obj);
        setDisabled(false);
    }

    const modifierValue = characteristicModifier(props.characteristicValue);
    let finalBonus = modifierValue;
    let activeClass ='';

    if(props.wield && props.competence) {
        finalBonus = Number(modifierValue) + Number(props.skillBonus) * 2;
        activeClass = 'skillsBlock__item_finalBonus-competence';
    } else if(props.wield) {
        finalBonus = Number(modifierValue) + Number(props.skillBonus);
        activeClass = 'skillsBlock__item_finalBonus-wield';
    }

    const finalBonusString = finalBonus > 0 ? `+${finalBonus}`: finalBonus;

    return(
        <>
            <div className={`skillsBlock__item_left`}>
                <div className={`skillsBlock__item_skillStatTitle`}>{props.statTitle}</div>
                <div className={`skillsBlock__item_title`}>{props.title}</div>
            </div>

            <div className={`skillsBlock__item_right`}>
                <div className={`skillsBlock__item_finalBonus ${activeClass}`}>
                    <span className={'skillsBlock__item_finalBonusNum'}>{finalBonusString}</span>
                </div>
                <div className={`skillsBlock__item_toggleElem`}>
                    <div className="skillsBlock__item_toggleElem-relative">
                        <div className="skillsBlock__item_toggleElem-absolute">
                            <div className="skillsBlock__item_circle" disabled={disabled}>
                                <CheckBox
                                    type="circle"
                                    defaultChecked={props.wield}
                                    onChange={(e) => updateSkills({type: 'wield', value: e.target.checked})}
                                />
                            </div>

                            <div className={`skillsBlock__item_square`} disabled={!props.wield || disabled}>
                                <CheckBox
                                    defaultChecked={props.competence}
                                    onChange={(e) => updateSkills({type: 'competence', value: e.target.checked})}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
});


function stateProps(state) {
    return {

        listId:  state.playerListInfo.list._id,
    }
}

function dispatchProps(dispatch) {
    return {
        updateSkillsAction: (data) => {
            return dispatch(updateSkillsAction(data))
        }
    }
}

export default connect(stateProps, dispatchProps)(Skills);
