import React, { PureComponent } from 'react';
import TextFieldContainer from "../../../uiComponents/containers/TextFieldContainer";

class CharacterInfoContainer extends PureComponent {
    render() {
        return(
            <div>
                <div className="characterInfo__name">
                    <div className="characterInfo__title">Нужно опыта</div>
                    <TextFieldContainer ontainer tagType="INPUT" fieldKey="maxExperience"/>
                </div>

                <div className="characterInfo__name">
                    <div className="characterInfo__title">Текущее кол-во</div>
                    <TextFieldContainer ontainer tagType="INPUT" fieldKey="currentExperience"/>
                </div>

                <div className="characterInfo__name">
                    <div className="characterInfo__title">Класс</div>
                    <TextFieldContainer ontainer tagType="INPUT" fieldKey="classes"/>
                </div>

                <div className="characterInfo__name">
                    <div className="characterInfo__title">Языки</div>
                    <TextFieldContainer ontainer tagType="INPUT" fieldKey="languages"/>
                </div>

                <div className="characterInfo">
                    <div className="characterInfo__name">
                        <div className="characterInfo__title">Имя персонажа</div>
                        <TextFieldContainer ontainer tagType="INPUT" fieldKey="playerName"/>
                    </div>

                    <div className="characterInfo__background">
                        <div className="characterInfo__title">Предыстория</div>
                        <TextFieldContainer tagType="INPUT" fieldKey="background"/>
                    </div>


                    <div className="characterInfo__alignment">
                        <div className="characterInfo__title">Мировозрение</div>
                        <TextFieldContainer tagType="INPUT" fieldKey="worldview"/>
                    </div>

                    <div className="characterInfo__race">
                        <div className="characterInfo__title">Раса</div>
                        <TextFieldContainer tagType="INPUT" fieldKey="race"/>
                    </div>

                    <div className="characterInfo__level">
                        <div className="characterInfo__title">Уровень</div>
                        <TextFieldContainer tagType="INPUT" fieldKey="level"/>
                    </div>

                    <div className="characterInfo__skillBonus">
                        <div className="characterInfo__title">Бонус мастерства</div>
                        <TextFieldContainer tagType="INPUT" fieldKey="skillBonus"/>
                    </div>
                </div>
            </div>
        )
    }
}


export default CharacterInfoContainer;
