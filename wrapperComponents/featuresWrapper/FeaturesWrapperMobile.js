import React from 'react';
import {connect} from "react-redux";
import {LISTS_DROPDOWN_SET_ID} from "../../constants";
import listsArray from "../../static/listsArray";
import ListElementWrapperMobile from "../../components/lists/containers/ListElementWrapperMobile";


const FeaturesWrapperMobile = React.memo((props) => {
    return(
        listsArray.map(el => (
            <ListElementWrapperMobile
                key={el.key}
                title={el.title}
                listType={el.key}
                setDropdownId={props.setDropdownId}
                openPopup={props.setPopupState}/>
        ))
    )
});


function dispatchProps(dispatch) {
    return {
        setDropdownId: (data) => {
            dispatch({
                type: LISTS_DROPDOWN_SET_ID,
                payload: {listId: data}
            })
        }
    }
}

export default connect(null, dispatchProps)(FeaturesWrapperMobile);