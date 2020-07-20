import React from 'react';

const SupportFormSkeleton = () => (
    <div className={`popupWrapper`}>
        <div className={`popupBlock supportForm`}>
            <div className={`supportFormSkeleton`}>
                <div className={`supportFormSkeleton__title`} />
                <div className={`supportForm__description supportFormSkeleton__description`} />
            </div>
        </div>
        <div className={`popupOverlay`}/>
    </div>
);

export default SupportFormSkeleton;