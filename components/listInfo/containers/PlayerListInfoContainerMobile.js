import React, {useState} from "react";
import {connect} from "react-redux";

import getPlayerListInfoAction from "../actions/getPlayerListInfoAction";
import AvatarContainer from "../../avatarComponent/containers/AvatarContainer";
import PersonalInfoContainer from "../../../wrapperComponents/personalInfo/containers/PersonalInfoContainer";
import BtnDeletePlayerList from "../../btnDeletePlayerList/containers/BtnDeletePlayerList";
import FeaturesWrapperContainer from "../../../wrapperComponents/featuresWrapper/FeaturesWrapperContainer";
import CharacterTextEditorsContainer
    from "../../../wrapperComponents/characterTextEditors/containers/CharacterTextEditorsContainer";
import FightInfo from "../../../wrapperComponents/fightInfo/containers/FightInfo";
import NotesBlockContainer from "../../../wrapperComponents/notesBlock/containers/NotesBlockContainer";
import SpellBookContainer from "../../../wrapperComponents/spellBook/containers/spellBookContainer";
import LevelBlock from "../../../wrapperComponents/levelBlock/containers/LevelBlock";
import PassiveValues from "../../../wrapperComponents/passiveValues/containers/PassiveValues";
import CharacteristicsContainer from "../../characteristic/containers/CharacteristicsContainer";
import SkillsContainer from "../../skills/containers/SkillsContainer";
import InventoryContainer from "../../../wrapperComponents/inventoryBlock/containers/InventoryContainer";
import CharacterPageSkeleton from "../../skeleton/components/characterPageSkeleton";
import CharacterMobile from "../../../wrapperComponents/characterMobile/containers/CharacterMobile";
import CharacterInfoMobile from "../../../wrapperComponents/characterInfoMobile/containers/CharacterInfoMobile";
import FeaturesDropdownAndForm from "../../../wrapperComponents/featuresWrapper/FeaturesDropdownAndForm";
import {SET_MOBILE_COMPONENT_ID} from "../../../constants";
import {Route, Switch} from "react-router-dom";
import r from "../../../routerConfig";
import MobileAttributes from "../../../wrapperComponents/mobileAttrributes/containers/MobileAttributes";
import InventoryMobile from "../../../wrapperComponents/inventoryBlock/containers/InventoryMobile";
import SpellBookMobileContainer from "../../../wrapperComponents/spellBook/containers/SpellBookMobileContainer";
import MobileMenuContainer from "../../header/containers/MobileMenuContainer";

const PlayerListInfoContainerMobile = React.memo((props) => {
    if(Object.keys(props.listInfo.list).length === 0) return <div>МОБИЛЬНЫЙ СКЕЛЕТ</div>;

    const {componentId} = props.listInfo.mobileState;
    const style = {display: 'none'};

    return(
        <div className={`playerListPage ${props.isMobile ? 'playerListPage-mobile' : ''}`}>
            <div className={`playerListContainer`}>
                <div style={componentId === 0 ? {} : style}>
                    <CharacterMobile setComponentId={props.setComponentId}/>
                </div>
                <div style={componentId === 1 ? {} : style}>
                    <CharacterInfoMobile
                        characterName={props.characterName}
                        isMobile={props.isMobile}
                        setComponentId={props.setComponentId}/>
                </div>
                <div style={componentId === 2 ? {} : style}>
                    <MobileAttributes
                        characterName={props.characterName}
                        setComponentId={props.setComponentId}/>
                </div>
                <div style={componentId === 3 ? {} : style}>
                    <InventoryMobile
                        characterName={props.characterName}
                        setComponentId={props.setComponentId}/>
                </div>
                <div style={componentId === 4 ? {} : style}>
                    <SpellBookMobileContainer
                        characterName={props.characterName}
                        setComponentId={props.setComponentId}/>
                </div>
                <div style={componentId === 5 ? {} : style}>
                    <MobileMenuContainer
                        setComponentId={props.setComponentId}/>
                </div>
                {/*<div style={componentId === 0 ? {} : style}></div>*/}
                {/*<div style={componentId === 0 ? {} : style}></div>*/}





                {/*<div className={`playerListContainer__sidebar`}>*/}
                {/*    <AvatarContainer/>*/}
                {/*    <LevelBlock />*/}
                {/*    <CharacteristicsContainer />*/}
                {/*    <PassiveValues />*/}
                {/*    <SkillsContainer />*/}
                {/*    <BtnDeletePlayerList />*/}
                {/*</div>*/}
                {/*<div className={`playerListContainer__main`}>*/}
                {/*    <div className={`personalInfo playerListContainer__block`}>*/}
                {/*        <div className={`personalInfo__left`}>*/}
                {/*            <PersonalInfoContainer />*/}
                {/*            <FeaturesWrapperContainer />*/}
                {/*        </div>*/}
                {/*        <div className={`personalInfo__right`}>*/}
                {/*            <CharacterTextEditorsContainer />*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*    <div className={`playerListContainer__fightInfo`}>*/}
                {/*        <div className={`playerListContainer__fightInfo_left`}>*/}
                {/*            <FightInfo />*/}
                {/*            <InventoryContainer />*/}
                {/*        </div>*/}
                {/*        <div className={`playerListContainer__fightInfo_right`}>*/}
                {/*            <NotesBlockContainer />*/}
                {/*            <SpellBookContainer />*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        </div>
    )
});


function mapStateToProps(state) {
    return {
        userId: state.userInfo.userId,
        listInfo: state.playerListInfo,
        characterName: state.playerListInfo.list.title,
        listsTitle: state.listsTitle.list
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getPlayerList: (data) => {
            return dispatch(getPlayerListInfoAction(data));
        },
        setComponentId: (data) => {
            dispatch({
                type: SET_MOBILE_COMPONENT_ID,
                payload: data
            })
        }
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(PlayerListInfoContainerMobile);
