import React, {useState, useEffect, useCallback} from 'react';
import WarningMessageBlock from "../components/WarningMessageBlock";
import {connect} from "react-redux";
import cleanMessageAction from "../actions/cleanMessageAction";
import constantsForDevice from "../../../static/constantsForDevice";

const WarningMessageContainer = (props) => {
    const [timeOut, setSetTimeout] = useState(null);
    const {message, cleanMessageAction} = props;


    //Отчитстка сообщения по таймеру
    const cleanMessageTimeout  = useCallback(() => {
        const clean = setTimeout(cleanMessageAction, 10000);
        setSetTimeout(clean);
    }, [cleanMessageAction]);

    useEffect(() => {
        if(message) cleanMessageTimeout();
    }, [message, cleanMessageTimeout]);


    //Отчистка по клику и сброс таймера
    const cleanMessageClick = useCallback(() => {
        if(timeOut) clearTimeout(Number(timeOut));
        cleanMessageAction();
    }, [timeOut, cleanMessageAction]);

    if(!message) return null;

    const isMobile = props.deviceType === constantsForDevice.mobile;
    return(
        <WarningMessageBlock
            message={message}
            success={props.success}
            cleanMessage={cleanMessageClick}
            isMobile={isMobile}
        />
    )
};

function stateProps(state) {
    return {
        message: state.warning.message,
        success: state.warning.success,
        deviceType: state.deviceInfo.device.type
    }
}

function dispatchProps(dispatch) {
    return {
        cleanMessageAction: () => {
            dispatch(cleanMessageAction)
        }
    }
}

export default connect(stateProps, dispatchProps)(WarningMessageContainer);