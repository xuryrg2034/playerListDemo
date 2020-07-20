import React from 'react';
import AvatarContainer from "../../../components/avatarComponent/containers/AvatarContainer";
import TextFieldContainer from "../../../uiComponents/containers/TextFieldContainer";
import BtnDeletePlayerList from "../../../components/btnDeletePlayerList/containers/BtnDeletePlayerList";
import '../styles/characterMobile.scss';

const CharacterMobile = React.memo((props) => (
    <div className={`characterMobile`}>
        <div className={`headerMobile`}>
            <div className={`btnGoBack btnGoBack-maxwidth`} onClick={() => props.setComponentId(5)}>Меню</div>
            <div className={`headerMobile__rightBtn`}>
                <BtnDeletePlayerList />
            </div>
        </div>
        <AvatarContainer/>
        <div className={`personalInfo__name`}>
            <TextFieldContainer
                placeholder={'Имя персонажа'}
                fieldKey={`title`}/>
        </div>
        <div className={`links`}>
            <div className={`links__item`} onClick={() => props.setComponentId(1)}>Персонаж</div>
            <div className={`links__item`} onClick={() => props.setComponentId(2)}>Атрибуты</div>
            <div className={`links__item`} onClick={() => props.setComponentId(3)}>Инвентарь</div>
            <div className={`links__item`} onClick={() => props.setComponentId(4)}>Заклинания</div>
        </div>
    </div>
));

export default CharacterMobile;