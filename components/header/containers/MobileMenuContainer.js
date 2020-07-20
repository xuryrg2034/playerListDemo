import React from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import r from "../../../routerConfig";
import LogOutContainer from "../../../auth/logOut/containers/logOutContainer";
import ListTitlesMobileContainer from "../../listTitles/containers/ListTitlesMobileContainer";
import '../styles/mobileMenu.scss';


const MobileMenuContainer = React.memo((props) => {
    return(
        <div className={`mobileMenu`}>
            <div className="mobileMenu__list">
                {props.authorized && <ListTitlesMobileContainer setComponentId={props.setComponentId}/>}
            </div>
            <div className="mobileMenu__bottom">
                <Link to={r.about} className={`mobileMenu__link links__item`}>О проекте</Link>
                {props.userEmail && <div className={`header__item header__email`}>{props.userEmail}</div>}
                {props.authorized && <div className={`mobileMenu__logout`}><LogOutContainer /></div>}
            </div>
        </div>
    )
});

function stateProps(state) {
    return {
        authorized: state.userInfo.authorized,
        userEmail: state.userInfo.userEmail,
    }
}

export default connect(stateProps, null)(MobileMenuContainer)