import React, { Component } from 'react';
import {connect} from "react-redux";
import updateTextFieldAction from "../actions/updateTextFieldAction";




class ObjectFieldContainer extends Component {

    constructor() {
        super();
        this.state = {};
        this.inputHandle = this.inputHandle.bind(this);
    }

    componentDidMount() {
        const { list, fieldKey } = this.props;
        const storeField = list[fieldKey];
        Object.keys(storeField).forEach(key => {
            this.setState({[key]: storeField[key]});
        })
    }

    inputHandle(val, key) {
        this.setState({[key]: val});
    };

    render() {
        const { userId, listId, fieldKey, list } = this.props;
        const storeField = list[fieldKey];
        const { updateObjectField } = this.props;
        const obj = this.state;

        const inputs = Object.keys(storeField).map(key => {
            return(
                <div key={key}>
                    <label>
                        <span>{key}</span>
                        <input type="text" defaultValue={storeField[key]} onInput={(e) => this.inputHandle(e.target.value, `${key}`)}/>
                    </label>
                </div>
            )
        })
        return(
            <form onSubmit={(e) => updateObjectField({e, userId, listId, fieldKey, obj})}>
                { inputs }
                <button type="submit">Сохранить</button>
            </form>
        )
    }
}




function mapStateToProps(state) {
    return {

        listId:  state.playerListInfo.list._id,
        list: state.playerListInfo.list,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateObjectField: ({e, userId, listId, fieldKey, obj}) => {
            e.preventDefault();
            const objData = {
                userId,
                listId,
                value: obj,
                fieldKey: fieldKey
            };

            dispatch(updateTextFieldAction(objData))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ObjectFieldContainer);
