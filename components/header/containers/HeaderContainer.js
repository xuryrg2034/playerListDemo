import React from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import r from "../../../routerConfig";
import LogOutContainer from "../../../auth/logOut/containers/logOutContainer";
import ListTitlesContainer from "../../listTitles/containers/ListTitlesContainer";
import '../styles/header.scss';


const HeaderContainer = React.memo((props) => {
    return(
        <>
            <div className={`header`}>
                <div className="header__left">
                    {props.authorized && <ListTitlesContainer />}
                    <Link to={r.about} className={`header__item header__link`}>О проекте</Link>
                </div>
                <div className="header__right">
                    {props.userEmail && <div className={`header__item header__email`}>{props.userEmail}</div>}
                    {props.authorized && <LogOutContainer />}
                </div>
            </div>
            {/*{props.authorized && <div></div>}*/}
        </>
    )
});

function stateProps(state) {
    return {
        authorized: state.userInfo.authorized,
        userEmail: state.userInfo.userEmail,
    }
}

export default connect(stateProps, null)(HeaderContainer)