import React from 'react';
import {connect} from "react-redux";
import listsArray from "../../../static/listsArray";
import {Scrollbars} from "react-custom-scrollbars";
import ListElement from "../components/ListElement";
import num2str from "../../../utils/trulyEndWord";
import '../styles/lists.scss';

const ListsMobileDropdown = (props) => {
    if(!props.activeListsId) return null;
    const currentListsArray = listsArray.find(el => el.key === props.activeListsId);
    const list = props.lists[props.activeListsId];
    const listLength = Object.keys(list).length;
    return(
        <div className={`listItem__list-mobile`}>
            <div className={`listItem__list_header headerMobile`}>
                <div
                    className={`btnGoBack`}
                    onClick={props.closeDropdown}
                >Персонаж</div>
                <div
                    className="listItem__list_btnCreateFeature"
                    onClick={() => {
                        props.openPopup({
                            visible: true,
                            featureType: props.activeListsId,
                            type: 'create'
                        });
                    }}
                >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.7 0H7.3V7.3H0V8.7H7.3V16H8.7V8.7H16V7.3H8.7V0Z" fill="#38302C" fillOpacity="0.4"/>
                    </svg>
                </div>
            </div>
            <div className="listItem__list_text">{listLength} {num2str(listLength, currentListsArray.declension)}</div>
            <div className={`listItem__list_dropdown`}>

                {
                    listLength
                    ? <Scrollbars
                        className={`listItem__list_customScroll`}
                        autoHeight={true}
                        autoHide={true}
                    >
                        <div className={'listItem__list_container'}>
                            {
                                Object.keys(list).map((key, index) =>
                                    <ListElement
                                        key={key}
                                        title={list[key].title || `No name ${index}`}
                                        description={list[key].description}
                                        id={key}
                                        listType={props.activeListsId}
                                        openPopup={props.openPopup}
                                    />)
                            }
                        </div>
                    </Scrollbars>
                    : <div className={`listItem__list_btnCreateFeature-empty`}>{currentListsArray.emptyListText}</div>
                }
            </div>
        </div>
    )
};

function stateProps(state) {
    return {
        lists: state.lists.listsInfo,
    }
}

export default connect(stateProps, null)(ListsMobileDropdown);