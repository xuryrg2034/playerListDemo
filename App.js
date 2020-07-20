import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Switch, Route, Redirect} from "react-router-dom";
import checkTokensWhenLoadAction from "./auth/signIn/actions/checkTokensWhenLoadAction";
import r from "./routerConfig";
import DeviceDetector from "device-detector-js";
import HeaderContainer from "./components/header/containers/HeaderContainer";
import EditPasswordPageContainer from "./pages/editPasswordPage/containers/EditPasswordPageContainer";
import './globalStyles/index.scss';
import WarningMessageContainer from "./components/warningMessage/containers/WarningMessageContainer";

import PlayerListContainer from "./pages/playerList/containers/playerListContainer";
import AuthenticationPage from "./pages/authentication/containers/authenticationContainer";
import CharacterPageSkeleton from "./components/skeleton/components/characterPageSkeleton";
import SupportWidget from "./components/support/containers/SupportWidget";
import constantsForDevice from "./static/constantsForDevice";
import {UPDATE_USER_INFO} from "./constants";
export const DEVICE_DETECTED = "DEVICE_DETECTED";


class App extends Component {
    componentDidMount() {
        const {checkToken, setAuthorized, history} = this.props;
        const refreshToken = localStorage['refreshToken'] || "";
        const accessToken = localStorage['accessToken'] || "";

        const { deviceDetect } = this.props;
        const deviceDetector = new DeviceDetector();
        const userAgent = window.navigator.userAgent;
        const device = deviceDetector.parse(userAgent);
        deviceDetect(device);

        if(this.props.authorized === '' && refreshToken && accessToken) {
            checkToken({refreshToken, accessToken}, history);
        } else {
            setAuthorized(false);
        }
    }

    render() {
        const { authorized, lastUsedList, deviceType } = this.props;
        const isMobile = deviceType && deviceType.type === constantsForDevice.mobile;

        if(authorized === '')  {
            return (isMobile ? null : <CharacterPageSkeleton />)
        }

        return (
            <>
                {!isMobile && <HeaderContainer />}
                <Switch>
                    { !authorized && <Route exact path={r.auth} component={AuthenticationPage}/> }
                    { !authorized && <Route exact path={r.editPassword} component={EditPasswordPageContainer}/> }
                    { authorized && <Route  path={r.list.path + r.list.params} component={PlayerListContainer}/> }
                    <Route path={r.about} component={null}/>


                    <Route render={() => (
                        authorized ? <Redirect to={`${r.list.path}/${lastUsedList}`}/> : <Redirect to={r.auth}/>
                    )}/>
                </Switch>

                <SupportWidget />
                <WarningMessageContainer />
            </>
        );
    }
}



function mapStateToProps(state) {
    return {
        authorized: state.userInfo.authorized,
        lastUsedList: state.userInfo.lastUsedList,
        deviceType: state.deviceInfo.device
    }
}

function mapDispatchToProps(dispatch) {
    return {
        checkToken: (data, history) => {
            dispatch(checkTokensWhenLoadAction(data, history));
        },
        deviceDetect: (data) => {
            dispatch({
                type: DEVICE_DETECTED,
                payload: data
            })
        },

        setAuthorized: (data) => {
            dispatch({
                type: UPDATE_USER_INFO,
                payload: {authorized: data}
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

