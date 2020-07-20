import React from 'react';
import '../styles/magicClasses.scss';
import MagicClassesBtnCreate from "../components/MagicClassesBtnCreate";
import MagicClassesListContainer from "./MagicClassesListContainer";

const MagicSpellClassesContainer = React.memo(() => {
    return(
        <div className={`magicClasses__classes`}>
            <MagicClassesListContainer />
            <MagicClassesBtnCreate />
        </div>
    )
});

export default MagicSpellClassesContainer