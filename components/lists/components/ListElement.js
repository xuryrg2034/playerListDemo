import React from "react";

const ListElement = React.memo(({title, id, listType, openPopup}) => {
    return(
        <div className={`listItem__item`}
             onClick={() => {
                 openPopup({
                     visible: true,
                     featureType: listType,
                     type: 'update',
                     featureId: id
                 });
             }}
        >
            {title}
        </div>
    )
});

export default ListElement;
