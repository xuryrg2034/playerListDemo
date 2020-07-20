import React  from 'react';
import {Link} from "react-router-dom";
import r from "../../../routerConfig";

const ListTitles = React.memo((props) => {

    const titles = props.titles.map((el, i) => {
        return(
            <Link
                key={el._id}
                className="playerLists__item" to={`${r.list.path}/${el._id}`}
                onClick={() => props.setComponentId && props.setComponentId(0)}
            >
                <div className="playerLists__item_img">
                    <img src="/img/emptyPortret.svg" alt="" />
                </div>
                <div className="playerLists__item_title">{el.title || `NO_NAME_${i}`}</div>
            </Link>
        )
    });

    return (
        <div className={`playerLists__list`}>{titles}</div>
    )
});

export default ListTitles;
