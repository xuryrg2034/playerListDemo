import React, {useState, useEffect} from 'react';
import {connect} from "react-redux";
import setMagicSpellFilter from "../actions/setMagicSpellFilter";

const initialState = [
    {
        id: 0,
        title: 'Все',
        active: true,
        filterKey: 'equipped',
        fieldValue: null
    },
    {
        id: 1,
        title: 'Подготовленные',
        active: false,
        filterKey: 'equipped',
        fieldValue: true
    },
];

const MagicSpellFilterContainer = React.memo((props) => {
    const [state, setState] = useState(initialState);
    const {setMagicSpellFilter} = props;

    const setFilter = (filterId) => {
        setState(state => {
            return(
                state.map(el => {
                    el.active = el.id === filterId;
                    return el;
                })
            )
        });
    }

    useEffect(() => {
        const activeFilter = state.find(el => el.active);
        setMagicSpellFilter({fieldKey: activeFilter.filterKey, fieldValue: activeFilter.fieldValue});
    }, [state, setMagicSpellFilter])

    const btnList = state.map(el => (
        <div
            key={el.id}
            className={`tabBtn__item ${el.active ? 'tabBtn__item-active' : ''}`}
            onClick={() => setFilter(el.id)}
        >
            <span className="tabBtn__item_text">{el.title}</span>
        </div>
    ))

    return(
        <div className={`magicSpellBlock__filter`}>
            {btnList}
        </div>
    )
});

function stateProps(state) {
    return {}
}

function dispatchProps(dispatch) {
    return {
        setMagicSpellFilter: (data) => {
            dispatch(setMagicSpellFilter(data));
        }
    }
}

export default connect(stateProps, dispatchProps)(MagicSpellFilterContainer);