import React from 'react';
import '../styles/skeletons.scss';

const CharacterPageSkeleton = () => (
    <div className={`playerListPage`}>
        <div className={`playerListContainer playerListContainer-skeleton`}>
            <div className={`playerListContainer__sidebar`}>
                <div className={`playerListContainer-skeleton__avatar`}></div>
            </div>
            <div className={`playerListContainer__main`}>
                <div className={`playerListContainer__block playerListContainer-skeleton__info`}></div>
                <div className={`playerListContainer__fightInfo`}>
                    <div className={`playerListContainer__fightInfo_left`}>
                        <div className={`playerListContainer__block playerListContainer-skeleton__health`}></div>
                        <div className={`playerListContainer__block playerListContainer-skeleton__inventory`}></div>
                    </div>
                    <div className={`playerListContainer__fightInfo_right`}>
                        <div className={`playerListContainer__block playerListContainer-skeleton__notes`}></div>
                        <div className={`playerListContainer__block playerListContainer-skeleton__spells`}></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default CharacterPageSkeleton;