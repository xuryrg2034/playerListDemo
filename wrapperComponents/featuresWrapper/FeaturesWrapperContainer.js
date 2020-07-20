import React, {useState, useEffect} from 'react';
import ListElementWrapper from "../../components/lists/containers/ListElementWrapper";
import ListElementFormContainer from "../../components/lists/containers/ListElementFormContainer";
import {connect} from "react-redux";
import {LIST_POPUP_STATE} from "../../constants";
import listsArray from "../../static/listsArray";


const FeaturesWrapperContainer = React.memo((props) => {
    const [activeListType, setActiveListType] = useState(false);

    useEffect(() => {
        window.addEventListener('click', (e) => {
            if(!e.target.closest('.listItem__btn')) {
                setActiveListType(false);
            }
        });
    },[]);

    const toggleVisibilityList = (type) => {
        if(type === activeListType) {
            setActiveListType(false);
        } else {
            setActiveListType(type);
        }
    }

    return(
        <>
            {
                listsArray.map(el => (
                    <ListElementWrapper
                        key={el.key}
                        title={el.title}
                        listType={el.key}
                        declension={el.declension}
                        activeListType={activeListType}
                        openPopup={props.setPopupState}
                        toggleVisibilityList={toggleVisibilityList}/>
                ))
            }

            {
                props.popupState.visible
                && <ListElementFormContainer
                    setPopupState={props.setPopupState}
                    listsKey={listsArray}/>
            }
        </>
    )
});

function stateProps(state) {
    return {
        popupState: state.lists.popupState
    }
}

function dispatchProps(dispatch) {
    return {
        setPopupState: (data) => {
            dispatch({
                type: LIST_POPUP_STATE,
                payload: data
            })
        }
    }
}

export default connect(stateProps, dispatchProps)(FeaturesWrapperContainer);