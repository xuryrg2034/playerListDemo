import React from 'react';

const ListFormSkeleton = () => (
    <div className={`popupWrapper`}>
        <div className={`listPopup popupBlock`}>
            <div className={`skeletonListForm`}>
                <div className={`skeletonListForm__title`}/>
                <div className={`listPopup__title`} />
                <div className={`listPopup__description`} />
            </div>
        </div>
        <div className={`popupOverlay`}/>
    </div>
);

export default ListFormSkeleton;