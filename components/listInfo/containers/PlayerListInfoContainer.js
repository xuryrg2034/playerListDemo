import React  from "react";
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


const PlayerListInfoContainer = React.memo((props) => {
    if(Object.keys(props.listInfo.list).length === 0) return <CharacterPageSkeleton /> ;

    return(
        <div className={`playerListPage`}>
            <div className={`playerListContainer`}>
                <div className={`playerListContainer__sidebar`}>
                    <AvatarContainer/>
                    <LevelBlock />
                    <CharacteristicsContainer />
                    <PassiveValues />
                    <SkillsContainer />
                    <BtnDeletePlayerList />
                </div>
                <div className={`playerListContainer__main`}>
                    <div className={`personalInfo playerListContainer__block`}>
                        <div className={`personalInfo__left`}>
                            <PersonalInfoContainer />
                            <FeaturesWrapperContainer />
                        </div>
                        <div className={`personalInfo__right`}>
                            <CharacterTextEditorsContainer />
                        </div>
                    </div>
                    <div className={`playerListContainer__fightInfo`}>
                        <div className={`playerListContainer__fightInfo_left`}>
                            <FightInfo />
                            <div className={`playerListContainer__block`}>
                                <InventoryContainer />
                            </div>
                        </div>
                        <div className={`playerListContainer__fightInfo_right`}>
                            <NotesBlockContainer />
                            <SpellBookContainer />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
});


function mapStateToProps(state) {
    return {

        listInfo: state.playerListInfo,
        listsTitle: state.listsTitle.list
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getPlayerList: (data) => {
            return dispatch(getPlayerListInfoAction(data));
        },
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(PlayerListInfoContainer);
