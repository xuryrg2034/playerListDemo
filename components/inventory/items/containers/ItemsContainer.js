import React, {useEffect, useState} from 'react';
import getItemsAction from "../actions/getItemsAction";
import {connect} from "react-redux";
import Item from "../components/Item";
import '../styles/items.scss'
import ItemFilterContainer from "../../filter/containers/ItemFilterContainer";
import Scrollbars from "react-custom-scrollbars";

const ItemsContainer = React.memo((props) => {
    const [loaded, setLoaded] = useState(false);
    const {listId, getItemsAction} = props;

    useEffect(() => {
        const fetch = async () => {
            await getItemsAction({listId});
            setLoaded(true);
        }

        fetch();
    }, [listId, getItemsAction]);


    const itemsList = Object.keys(props.items).map(key => {
        if(
            props.itemFilter.fieldValue === null
            || props.items[key][props.itemFilter.fieldKey] === props.itemFilter.fieldValue
        ) {
            return(
                <Item
                    key={key}
                    openPopup={props.setPopupState}
                    {...props.items[key]}
                />
            )
        } else {
            return null;
        }
    });

    if(!loaded) return null;

    if(!Object.keys(props.items).length) {
        return (
            <div
                className={`emptyList__btnCreate`}
                onClick={() => {props.setPopupState({visible: true, type: 'create'})}}
            >Добавить предмет</div>
        )
    }

    return(
        <>
            <div className={`equippedItem__filterWrapper`}>
                <ItemFilterContainer />
                <div  className={`equippedItem__btnCreate`} onClick={() => {props.setPopupState({visible: true, type: 'create'})}}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.7 0H7.3V7.3H0V8.7H7.3V16H8.7V8.7H16V7.3H8.7V0Z" fill="#38302C" fillOpacity="0.4"/>
                    </svg>
                </div>
            </div>
            <div className={`itemsContainer`}>
                <Scrollbars
                    className={`itemsContainer__customScroll`}
                    autoHide={true}
                    autoHeight={true}
                    autoHeightMax={847}
                >
                    {itemsList}
                </Scrollbars>
            </div>
        </>
   )
});

function stateProps(state) {
    return {

        listId:  state.playerListInfo.list._id,
        items: state.inventory.items,
        itemFilter: state.inventory.filter
    }
}

function dispatchProps(dispatch) {
    return {
        getItemsAction: (data) => {
            return dispatch(getItemsAction(data))
        }
    }
}

export default connect(stateProps, dispatchProps)(ItemsContainer);