import React from 'react';
import '../styles/mobileAttributes.scss'
import LevelBlock from "../../levelBlock/containers/LevelBlock";
import FightInfo from "../../fightInfo/containers/FightInfo";
import PassiveValues from "../../passiveValues/containers/PassiveValues";
import CharacteristicsContainer from "../../../components/characteristic/containers/CharacteristicsContainer";
import SkillsContainer from "../../../components/skills/containers/SkillsContainer";

const MobileAttributes = (props) => (
    <div className={`attributesMobile`}>
        <div className={`headerMobile headerMobile-withTitle headerMobile-paddingNull`}>
            <div className={`btnGoBack btnGoBack-maxwidth`} onClick={() => props.setComponentId(0)}>{props.characterName}</div>
            <div className={`headerMobile__title`}>Атрибуты</div>
        </div>
        <LevelBlock />
        <FightInfo />
        <CharacteristicsContainer />
        <PassiveValues />
        <SkillsContainer />
    </div>
);

export default MobileAttributes;