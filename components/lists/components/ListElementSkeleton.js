import React from 'react';
import '../styles/listSkeleton.scss';

const ListElementSkeleton = () => (
    <div className={`listItem listItem-skeleton`}>
        <div className={`listItem__btn`}>
            <div className="listItem__title">...</div>
        </div>
    </div>
);

export default ListElementSkeleton;