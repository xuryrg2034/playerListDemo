import React, { useEffect, useCallback } from "react";
import { connect } from "react-redux";
import ListElement from "../components/ListElement";
import deleteElemInfoAction from "../actions/deleteElemInfoAction";
import getListElementAction from "../actions/getListElementAction";
import num2str from "../../../utils/trulyEndWord";
import { Scrollbars } from 'react-custom-scrollbars';
import '../styles/lists.scss';
import ListElementSkeleton from "../components/ListElementSkeleton";


const ListElementWrapper = React.memo((props) => {

    const {getListElement, listId, listType} = props;
    const fetch = useCallback(() => {
        getListElement({listId, listType});
    }, [getListElement, listId, listType]);
    
    useEffect(fetch, [fetch]);


    if(props.lists[listType] === undefined) return <ListElementSkeleton />;


    const targetElem = React.createRef();
    const listLength = Object.keys(props.lists[listType]).length;
    const elemList = (obj) => {
        return(
            Object.keys(obj).map((el, index) =>
                <ListElement
                    key={el}
                    title={obj[el].title || `No name ${index}`}
                    description={obj[el].description}
                    id={el}
                    listType={listType}
                    openPopup={props.openPopup}
                />
            )
        );
    };

    return(
        <div className={`listItem ${props.activeListType === listType ? 'listItem-active' : ''}`}>
            <div
                ref={targetElem}
                onClick={() => props.toggleVisibilityList(listType)}
                className={`listItem__btn`}
            >
                <div className="listItem__left">
                    <div className="listItem__title">{props.title}</div>
                </div>
                <div className="listItem__right">
                    <div className="listItem__num">{listLength}</div>
                    <div className={`listItem__arrow`}>
                        <svg width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.30859 10.8613C1.46094 10.8613 1.58984 10.8027 1.68945 10.7031L6.33594 6.16211C6.44727 6.05078 6.50586 5.91602 6.50586 5.76953C6.50586 5.61719 6.44727 5.47656 6.33594 5.37695L1.69531 0.841797C1.58984 0.736328 1.46094 0.677734 1.30859 0.677734C1.00391 0.677734 0.775391 0.912109 0.775391 1.2168C0.775391 1.35742 0.833984 1.49805 0.927734 1.59766L5.19336 5.76953L0.927734 9.94141C0.833984 10.041 0.775391 10.1758 0.775391 10.3223C0.775391 10.627 1.00391 10.8613 1.30859 10.8613Z" fill="#38302C" fillOpacity="0.4"/>
                        </svg>
                    </div>
                </div>
            </div>
            {
                props.activeListType === listType
                && <div className={`listItem__list ${listLength ? 'listItem__list-notEmpty' : ''}`}>
                    <div
                        className="listItem__list_info"
                        onClick={() => {
                            props.openPopup({
                                visible: true,
                                featureType: listType,
                                type: 'create'
                            })
                        }}
                    >
                        <div className="listItem__list_text">{listLength} {num2str(listLength, props.declension)}</div>
                        <div className="listItem__list_btnCreateFeature">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.7 0H7.3V7.3H0V8.7H7.3V16H8.7V8.7H16V7.3H8.7V0Z" fill="#38302C" fillOpacity="0.4"/>
                            </svg>
                        </div>
                    </div>
                    {
                        !!listLength
                        && <Scrollbars
                            className={`listItem__list_customScroll`}
                            autoHeight={true}
                            autoHide={true}
                        >
                            <div className={'listItem__list_container'}>
                                {elemList(props.lists[listType])}
                            </div>
                        </Scrollbars>
                    }
                </div>
            }

        </div>
    )
});

function mapStateToProps(state) {
    return {
        lists: state.lists.listsInfo,
        listId:  state.playerListInfo.list._id
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getListElement: (data) => {
            dispatch(getListElementAction(data));
        },
        deleteElement: (data) => {
            dispatch(deleteElemInfoAction(data));
        }
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(ListElementWrapper);
