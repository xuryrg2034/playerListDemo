import React, {useState, useEffect} from 'react';
import {connect} from "react-redux";
import setItemFilter from "../actions/setItemFilter";

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
        title: 'Экипированные',
        active: false,
        filterKey: 'equipped',
        fieldValue: true
    },
];

const ItemFilterContainer = React.memo((props) => {
    const [state, setState] = useState(initialState);

    const setFilter = (filterId) => {
        setState(state => {
            return(
                state.map(el => {
                    el.active = el.id === filterId;
                    return el;
                })
            )
        });
    };

    const {setItemFilter} = props;
    useEffect(() => {
        const activeFilter = state.find(el => el.active);
        setItemFilter({fieldKey: activeFilter.filterKey, fieldValue: activeFilter.fieldValue});
    }, [state, setItemFilter]);

    const btnList = state.map(el => (
        <div
            key={el.id}
            className={`tabBtn__item ${el.active ? 'tabBtn__item-active' : ''}`}
            onClick={() => setFilter(el.id)}
        >
            <span className="tabBtn__item_text">{el.title}</span>
        </div>
    ));

    return(
        <div className={`equippedItem__filter`}>
            {btnList}
        </div>
    )
});

function dispatchProps(dispatch) {
    return {
        setItemFilter: (data) => {
            dispatch(setItemFilter(data));
        }
    }
}

export default connect(null, dispatchProps)(ItemFilterContainer);