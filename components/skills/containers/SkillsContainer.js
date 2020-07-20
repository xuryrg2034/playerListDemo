import React  from "react";
import {connect} from "react-redux";
import SkillList from "../components/SkillList";
import '../styles/skills.scss';



const SkillsContainer = React.memo((props) => {
    const sortSkillsObject = props.characteristics.reduce((acc, el) => {
        acc[el._id] = props.skills.filter(skill => skill.characteristic === el._id);
        return acc;
    }, []);

    const skillLists = (obj) => {
        return (
            Object.keys(obj).map((key, index) => {
                if(!obj[key].length) return null

                const characteristic = props.characteristics.find(el => el._id === key);
                return (
                    <div key={key} className={`skillsBlock-wrapper`}>
                        <SkillList
                            title={characteristic.title.slice(0, 3)}
                            skillsArray={obj[key]}
                            characteristicValue={characteristic.value}
                            skillBonus={props.skillBonus}/>
                    </div>
                )
            })
        )
    }

    return(
        <div className={`skillsBlock`}>
            {skillLists(sortSkillsObject)}
        </div>
    )
});

function stateProps(state) {
    return {
        skills: state.playerListInfo.list.skills,
        skillBonus: state.playerListInfo.list.skillBonus,
        characteristics: state.playerListInfo.list.characteristics
    }
}

function dispatchProps(dispatch) {
    return{}
}

export default  connect(stateProps, dispatchProps)(SkillsContainer);
