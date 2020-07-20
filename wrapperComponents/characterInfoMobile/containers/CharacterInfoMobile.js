import React from 'react';
import PersonalInfoContainer from "../../personalInfo/containers/PersonalInfoContainer";
import FeaturesWrapperMobile from "../../featuresWrapper/FeaturesWrapperMobile";
import FeaturesDropdownAndForm from "../../featuresWrapper/FeaturesDropdownAndForm";
import CharacterTextEditorsBtnList from "../../characterTextEditors/containers/CharacterTextEditorsBtnList";
import PopupEditor from "../../characterTextEditors/components/PopupEditor";
import '../styles/characterInfoMobile.scss';

const CharacterInfoMobile = React.memo((props) => (
    <div className={`characterInfo`}>
        <div className={`headerMobile headerMobile-withTitle headerMobile-paddingNull`}>
            <div className={`btnGoBack btnGoBack-maxwidth`} onClick={() => props.setComponentId(0)}>{props.characterName}</div>
            <div className={`headerMobile__title`}>Персонаж</div>
        </div>
        <div>
            <PersonalInfoContainer isMobile={props.isMobile}/>
            <FeaturesWrapperMobile />
            <CharacterTextEditorsBtnList />
        </div>
        <FeaturesDropdownAndForm />
        <PopupEditor />
    </div>
));

export default CharacterInfoMobile;