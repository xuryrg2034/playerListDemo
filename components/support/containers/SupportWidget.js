import React /*{useCallback, useState, useEffect, Suspense}*/ from 'react';
import SupportBtn from "../components/SupportBtn";
import '../styles/supportForm.scss';
import {connect} from "react-redux";
import constantsForDevice from "../../../static/constantsForDevice";
// import {SYSTEM_MESSAGE} from "../../../constants";
// import {connect} from "react-redux";
// import sendFormAction from "../actions/sendFormAction";
// import stopScroll from "../../../utils/stopScroll";
// import SupportFormSkeleton from "../components/SupportFormSkeleton";

// const SupportForm = React.lazy(() => import(`../components/SupportForm`));


const SupportWidget = (props) => {
    // const [isVisible, setIsVisible] = useState(true);
    // const [disabled, setDisabled] = useState(false);

    // const {sendForm, userId, listId} = props;
    // const onSubmit = useCallback(async (values) => {
    //     if(disabled) return false;
    //
    //     setDisabled(true);
    //
    //     await sendForm({...values, userId, listId});
    //
    //     setDisabled(false)
    // }, [sendForm, disabled, userId, listId]);

    // const toggleFormVisible = useCallback((visible) => {
    //     if(disabled) return false;
    //     setIsVisible(visible);
    // }, [disabled]);


    // useEffect(() => {
    //     stopScroll.scroll(!isVisible);
    // }, [isVisible]);

    const isMobile = props.deviceType === constantsForDevice.mobile;
    return(
        <div className={`supportWidget ${isMobile ? 'supportWidget-mobile' : ''}`}>
            <SupportBtn />
        </div>
    )
};

function stateProps(state) {
    return {
        userId: state.userInfo.userId,
        list: state.listsTitle.list,
        deviceType: state.deviceInfo.device.type
    }
}
//
//
// function dispatchProps(dispatch) {
//     return {
//         sendForm: (data) => {
//             return dispatch(sendFormAction(data))
//         },
//         formError: (message) => {
//             dispatch({
//                 type: SYSTEM_MESSAGE,
//                 payload: {message}
//             })
//         }
//     }
// }


export default connect(stateProps, null)(SupportWidget);