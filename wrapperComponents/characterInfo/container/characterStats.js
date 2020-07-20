import React, { PureComponent } from 'react';
import TextFieldContainer from "../../../uiComponents/containers/TextFieldContainer";


class CharacterStats extends PureComponent {
    render() {
        return(
            <div className="characterStats">

                <div className="characterStats__armorClass">
                    <div className="characterStats__armorClass_icon">
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 512 512">
                            <path d="M461.144,60.883L260.312,0.633c-2.809-0.844-5.808-0.844-8.62,0L50.858,60.883c-6.345,1.903-10.69,7.743-10.69,14.367    v220.916c0,28.734,11.632,58.148,34.573,87.425c17.522,22.36,41.762,44.813,72.048,66.736    c50.877,36.828,100.975,59.42,103.083,60.363c1.95,0.873,4.039,1.31,6.129,1.31c2.089,0,4.179-0.436,6.129-1.31    c2.108-0.943,52.205-23.535,103.082-60.363c30.285-21.923,54.525-44.376,72.047-66.736c22.941-29.276,34.573-58.69,34.573-87.425    V75.25C471.833,68.626,467.489,62.786,461.144,60.883z M441.833,296.166c0,50.852-51.023,98.534-93.826,129.581    c-38.374,27.833-77.291,47.583-92.005,54.678c-14.714-7.095-53.632-26.845-92.006-54.678    c-42.804-31.047-93.828-78.729-93.828-129.581V86.41l185.833-55.75l185.832,55.75V296.166z"/>
                        </svg>
                    </div>
                    <div className="characterStats__armorClass_input">
                        <TextFieldContainer tagType="INPUT" fieldKey="armorClass"/>
                    </div>
                    <div className="characterStats__armorClass_title">Класс доспеха</div>
                </div>

                <div className="characterStats__initiative">
                    <div className="characterStats__boxContainer">
                        <div className="characterStats__boxContainer_title">Инициатива</div>
                        <div className="characterStats__boxContainer_input">
                            <TextFieldContainer tagType="INPUT" fieldKey="initiative"/>
                        </div>
                    </div>
                </div>

                <div className="characterStats__speed">
                    <div className="characterStats__boxContainer">
                        <div className="characterStats__boxContainer_title">Скорость</div>
                        <div className="characterStats__boxContainer_input">
                            <TextFieldContainer tagType="INPUT" fieldKey="speed"/>
                        </div>
                    </div>
                </div>

                {/*Блок с хп*/}
                <div className="characterStats__healthBlock">
                    <div className="characterStats__maxHealth">
                        <div className="characterStats__maxHealth_title">Максимум хитов</div>
                        <div className="characterStats__maxHealth_input">
                            <TextFieldContainer tagType="INPUT" fieldKey="maxHealth"/>
                        </div>
                    </div>

                    <div className="characterStats__currentHealth">
                        <div className="characterStats__currentHealth_input">
                            <TextFieldContainer tagType="INPUT" fieldKey="currentHealth"/>
                        </div>
                        <div className="characterStats__currentHealth_title">Текущее количество хитов</div>
                    </div>

                    <div className="characterStats__healthBlock_line" />

                    <div className="characterStats__temporaryHealth">
                        <div className="characterStats__temporaryHealth_input">
                            <TextFieldContainer tagType="INPUT" fieldKey="temporaryHealth"/>
                        </div>
                        <div className="characterStats__temporaryHealth_title">Временные хиты</div>
                    </div>
                </div>

                <div className="characterStats__savingThrows">
                    <h3>Броски смерти</h3>
                    <div>Успех</div>
                    <TextFieldContainer tagType="INPUT" fieldKey="savingThrowsFromDeathSuccess"/>
                    <div>Провал</div>
                    <TextFieldContainer tagType="INPUT" fieldKey="savingThrowsFromDeathFailure"/>

                    <h3>Бонус к урону</h3>
                    <TextFieldContainer tagType="INPUT" fieldKey="damageBonus"/>
                    <h3>Бонус к попаданию</h3>
                    <TextFieldContainer tagType="INPUT" fieldKey="penetrationBonus"/>
                </div>




            </div>
        )
    }
}

export default CharacterStats;
