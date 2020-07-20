import React, {PureComponent} from "react";
import Characteristics from "../components/characteristics";
import {connect} from "react-redux";
import updateCharacteristicAction from "../actions/updateCharacteristicAction";
import characteristicModifier from "../../../utils/characteristicModifier";
import '../styles/characteristic.scss'

let requestTimeout;


class CharacteristicsContainer extends  PureComponent {

    constructor(props) {
        super(props);

        this.update = this.update.bind(this);
        this._statsList = this._statsList.bind(this);
    }

    update(data) {
        const { listId, updateCharacteristic } = this.props;

        updateCharacteristic(data, listId)
    }

    _statsList(arr) {
        const itemsBonusObj = Object.keys(this.props.items).reduce((acc, key) => {
            if(this.props.items[key].equipped && this.props.items[key].characteristics.length) {
                this.props.items[key].characteristics.forEach(el => {
                    acc[el.statId] = isNaN(acc[el.statId]) ? Number(el.value) : Number(acc[el.statId]) + Number(el.value);
                });
            }
            return acc;
        }, {});

        return arr.map(val => {
            const {_id, value, title} = val;
            const itemsBonus = itemsBonusObj[_id] || 0;
            const modifier = characteristicModifier(val.value + itemsBonus);
            const modifierString = modifier > 0 ? `+${modifier}`: modifier;

            return (
                <div key={_id} className={`characteristicsBlock__row`}>
                    <Characteristics
                        _id={_id}
                        title={title}
                        modifierString={modifierString}
                        updateCharacteristic={this.update}
                        itemsBonus={itemsBonus}
                        value={value}
                    />
                </div>
            )
        })
    }

    render() {
        const {characteristics} = this.props;
        const {_statsList} = this;

        return (
            <div className={`characteristicsBlock`}>
                <div className="characteristicsBlock__header">
                    <div className="characteristicsBlock__row_left">
                        <div className="characteristicsBlock__title"/>
                        <div className="characteristicsBlock__input"/>
                    </div>
                    <div className={`characteristicsBlock__row_right`}>
                        <div className="characteristicsBlock__equipmentBonus characteristicsBlock__header_title">Предм</div>
                        <div className="characteristicsBlock__modifierBonus characteristicsBlock__header_title">Бонус</div>
                        <div className="characteristicsBlock__savingThrowsBonus characteristicsBlock__header_title">Спас</div>
                    </div>
                </div>
                {_statsList(characteristics)}
            </div>
        );
    }
}

// <SavingThrowsContainer/>

function mapDispatchToProps(dispatch) {
    return {
        updateCharacteristic: (data, listId) => {
            if(requestTimeout) {
                clearTimeout(requestTimeout);
            }

            requestTimeout= setTimeout(() => {
                dispatch(updateCharacteristicAction(data, listId))
            }, 400)

        },
    }
}

function  mapStateToProps(state) {
    return {
        listId:  state.playerListInfo.list._id,
        characteristics: state.playerListInfo.list.characteristics,
        items: state.inventory.items
    }
}


export default  connect(mapStateToProps, mapDispatchToProps)(CharacteristicsContainer);
