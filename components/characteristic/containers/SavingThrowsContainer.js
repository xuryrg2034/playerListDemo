import React, { useState } from "react";
import {connect} from "react-redux";
import updateSavingThrowsAction from "../actions/updateSavingThrowsAction";
import CheckBox from "../../../uiComponents/components/CheckBox";



const SavingThrowContainer = React.memo((props) => {
    const [disabled, setDisabled] = useState(false);

    const updateSavingThrows = async(data) => {
        if(disabled) return false;
        setDisabled(true);
        await props.updateSavingThrows(data);
        setDisabled(false);
    }

    const wield = props.savingThrows.find(el => el._id === props.characteristicId).wield;
    const bonusValue = wield ? Number(props.skillBonus) + Number(props.characteristicModifier) : props.characteristicModifier

    return (
        <label className={`characteristicsBlock__savingThrowsBonus_label`}>
            <div className={`characteristicsBlock__savingThrowsBonus_value ${wield ? 'characteristicsBlock__savingThrowsBonus_value-wield' : ''}`}>
                <div className={'characteristicsBlock__savingThrowsBonus_num'}>{bonusValue > 0 ? `+${Number(bonusValue)}` : bonusValue}</div>
            </div>
            <div className="characteristicsBlock__savingThrowsBonus_toggleElem" disabled={disabled}>
                <CheckBox
                    type="circle"
                    defaultChecked={wield}
                    onChange={(e) => {
                        updateSavingThrows({
                            characteristicId: props.characteristicId,
                            wield: e.target.checked,
                            listId: props.listId
                        })
                    }}
                />
            </div>
        </label>
    );
})


function  stateProps(state) {
    return {

        listId:  state.playerListInfo.list._id,
        skillBonus: state.playerListInfo.list.skillBonus,
        savingThrows: state.playerListInfo.list.savingThrows
    }
}

function dispatchProps(dispatch) {
    return {
        updateSavingThrows: (data) => {
            return dispatch(updateSavingThrowsAction(data));
        }
    }
}

export default  connect(stateProps, dispatchProps)(SavingThrowContainer);
