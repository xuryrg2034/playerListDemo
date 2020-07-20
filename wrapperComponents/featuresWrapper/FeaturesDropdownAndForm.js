import React from 'react';
import ListsMobileDropdown from "../../components/lists/containers/ListsMobileDropdown";
import ListElementFormContainer from "../../components/lists/containers/ListElementFormContainer";
import {connect} from "react-redux";
import {LIST_POPUP_STATE, LISTS_DROPDOWN_DEFAULT} from "../../constants";
import listsArray from "../../static/listsArray";

const FeaturesDropdownAndForm = (props) => (
    <>
        <ListsMobileDropdown
            closeDropdown={props.closeDropdown}
            activeListsId={props.activeListsId}
            openPopup={props.setPopupState}
        />
        {
            props.popupVisible
            && <ListElementFormContainer
                setPopupState={props.setPopupState}
                listsKey={listsArray}
            />
        }

    </>
);

function stateProps(state) {
    return {
        activeListsId: state.lists.dropdownState.listId,
        popupVisible: state.lists.popupState.visible
    }
}

function dispatchProps(dispatch) {
    return {
        closeDropdown: () => {
            dispatch({
                type: LISTS_DROPDOWN_DEFAULT
            })
        },
        setPopupState: (data) => {
            dispatch({
                type: LIST_POPUP_STATE,
                payload: data
            })
        }
    }
}


export default connect(stateProps, dispatchProps)(FeaturesDropdownAndForm);