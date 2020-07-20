import React from 'react';
import FightInfoFields from "../components/FightInfoFields";
import FightInfoHealth from "../components/FightInfoHealth";

const FightInfo = React.memo(() => {
    return(
        <div className={`playerListContainer__block`}>
            <div className={`fightInfo`}>
                <div className={`fightInfo__left`}>
                    <FightInfoFields />
                </div>
                <div className={`fightInfo__right`}>
                    <FightInfoHealth />
                </div>
            </div>
        </div>
    )
})

export default FightInfo;