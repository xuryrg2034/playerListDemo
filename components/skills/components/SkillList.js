import React from 'react';
import Skills from "./Skills";

const SkillList = React.memo((props) => {
    let flag = false;
    let prevStat = '';

    const skillItems = (arr) => {
        return(
            arr.map(el => {
                if(prevStat !== el.characteristic) {
                    flag = true
                    prevStat = el.characteristic;
                } else if(prevStat === el.characteristic) {
                    flag = false;
                }

                return(
                    <div key={el._id} className={`skillsBlock__row ${flag ? 'skillsBlock__row-visibleStatTitle' : ''}`}>
                        <Skills
                            id={el._id}
                            title={el.title}
                            statTitle={props.title}
                            characteristicValue={props.characteristicValue}
                            skillBonus={props.skillBonus}
                            wield={el.wield}
                            competence={el.competence}
                        />
                    </div>
                )
            })
        )
    }
    return(
        skillItems(props.skillsArray)
    )
});

export default SkillList;