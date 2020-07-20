import React, {useEffect} from "react";
import {connect} from "react-redux";
import ListTitles from "../components/ListTitles";
import getTitlesPlayerListAction from "../actions/getTitlesPlayerListAction";
import {withRouter} from "react-router-dom";
import BtnCreateNewCharacter from "../../btnCreateNewCharacter/containers/BtnCreateNewCharacter";
import '../styles/listTitles.scss'


const ListTitlesMobileContainer = React.memo((props) => {
    const {getTitlesPlayerList} = props;

    useEffect(() => {
        getTitlesPlayerList()
    }, [getTitlesPlayerList]);

    if(props.listsTitle.status !== 'success') return null;

    return(
        <>
            <div className={`mobileMenu__btnCreate`}>
                <div className={`mobileMenu__btnCreate_title`}>Персонажи</div>
                <BtnCreateNewCharacter history={props.history}/>
            </div>
            <ListTitles titles={props.listsTitle.list} setComponentId={props.setComponentId}/>
        </>
    )
});


function mapStateToProps(state) {
    return {
        listsTitle: state.listsTitle,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getTitlesPlayerList: (data) => {
            dispatch(getTitlesPlayerListAction(data));
        }
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListTitlesMobileContainer));
