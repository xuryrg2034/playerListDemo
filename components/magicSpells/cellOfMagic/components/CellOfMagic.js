import React, {useReducer, useEffect, useState, useCallback} from 'react';
import {connect} from "react-redux";
import updateCellsOfMagickAction from "../actions/updateCellsOfMagickAction";
import CustomInputComponent from "../../../../uiComponents/components/customInputComponent";
import '../../styles/magicCellItem.scss';
import constantsForDevice from "../../../../static/constantsForDevice";


function reducer(state, action) {
    switch (action.type) {
        case 'increment':
            if(state.count + 1 > state.maxCount) {
                return {...state, count: state.maxCount, fieldKey: null};
            } else {
                return {...state, count: state.count + 1, fieldKey: action.fieldKey};
            }
        case 'decrement':
            if(state.count - 1 < 0) {
                return {...state, count: 0, fieldKey: null};
            } else {
                return {...state, count: state.count - 1, fieldKey: action.fieldKey};
            }
        case 'updateMaxCount':
            return {count: Number(action.value), maxCount: Number(action.value), fieldKey: action.fieldKey}
        default:
            throw new Error();
    }
}

const CellOfMagic = React.memo((props) => {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const initialState = {
        count: Number(props.currentCount),
        maxCount: Number(props.maxCount),
        fieldKey: null
    }

    const {_id, listId, updateCellsOfMagick} = props;
    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchData = useCallback(() => {
        updateCellsOfMagick({
            value: state.count,
            id:_id,
            type: state.fieldKey,
            listId,
        });
    }, [state, updateCellsOfMagick, _id, listId]);

    useEffect(() => {
        if(state.fieldKey) {
            fetchData();
        }
    }, [state, fetchData]);

    const viewsCells = [];
    for(let i = 0; i < state.maxCount; i++) {
        viewsCells.push(<div key={i} className={`magicCellItem__viewCells_item ${i < state.count ? 'magicCellItem__viewCells_item-full' : ''}`} />)
    }

    const isMobile = props.deviceType === constantsForDevice.mobile;
    return(
        <>
            <div className={`magicSpellBlock__left`}>
                <div className={`magicCellItem-wrapper ${dropdownVisible ? 'magicCellItem-wrapper-dropdownVisible' : ''}`}>
                    <div className={`magicCellItem`}>
                        <div className="magicCellItem__infoWrapper" onClick={() => setDropdownVisible(true)}>
                            <div className={`magicCellItem__title`}>{Number(props.level) ? `Круг ${props.level}` : `Заговоры`}</div>
                            <div className={`magicCellItem__viewCells`}>{viewsCells}</div>
                        </div>

                        {
                            !!Number(props.level)
                            && dropdownVisible
                            && !isMobile
                            && <>
                                <Dropdown
                                    dispatch={dispatch}
                                    state={state}/>
                                <div className="magicCellItem__overlay" onClick={() => setDropdownVisible(false)} />
                            </>
                        }
                    </div>
                </div>
            </div>
            {
                !!Number(props.level)
                && dropdownVisible
                && isMobile
                && <>
                    <Dropdown
                        dispatch={dispatch}
                        state={state}/>
                    <div className="magicCellItem__overlay" onClick={() => setDropdownVisible(false)} />
                </>
            }
        </>
    )
});

const Dropdown = React.memo((props) => {
    const {dispatch, state} = props;
   return(
       <>
           <div className="magicCellItem__dropdown">
               <label className={`magicCellItem__maxCount`}>
                   <div className={`magicCellItem__maxCount_labelText`}>Количество ячеек</div>
                   <CustomInputComponent
                       placeholder={`0`}
                       value={state.maxCount || ''}
                       type={`number`}
                       onChange={(e) => dispatch({
                           type: 'updateMaxCount',
                           value: e.target.value,
                           fieldKey: 'maxCount'
                       })}
                   />
               </label>


               <div className={`magicCellItem__dropdown_btn magicCellItem__dropdown_btn-red`}
                    onClick={() => dispatch({
                        type: 'decrement',
                        fieldKey: 'currentCount'
                    })}>Потратить одну</div>

               <div className={`magicCellItem__dropdown_btn`}
                    onClick={() => dispatch({
                        type: 'increment',
                        fieldKey: 'currentCount'
                    })}>Восстановить одну</div>

               <div className={`magicCellItem__dropdown_btn`}
                    onClick={() => dispatch({
                        type: 'updateMaxCount',
                        fieldKey: 'maxCount',
                        value: state.maxCount
                    })}>Восстановить все</div>
           </div>
       </>
   )
});

function stateProps(state) {
    return {
        deviceType: state.deviceInfo.device.type
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateCellsOfMagick: (data) => {
            dispatch(updateCellsOfMagickAction(data));
        }
    }
}

export default connect(stateProps, mapDispatchToProps)(CellOfMagic);