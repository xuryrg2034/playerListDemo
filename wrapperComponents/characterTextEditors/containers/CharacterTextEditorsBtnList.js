import React, { useState } from 'react';
import {connect} from "react-redux";
import '../styles/characterTextEditors.scss';
import {SET_TEXT_EDITOR_ID} from "../../../constants";
import editorsList from "../../../static/editorsList";


const CharacterTextEditorsContainer = React.memo((props) => {
    const tabs = editorsList;


    //listItem
    return(
        tabs.map(el => {
            return(
                <div
                    key={el.id}
                    className={`listItem`}
                    onClick={() => props.setTextEditorId(el.id)}
                >
                    <div className={`listItem__btn`}>
                        <div className={`listItem__left`}>
                            <div className={`listItem__title`}>{el.title}</div>
                        </div>
                        <div className={`listItem__right`}>
                            <div className="listItem__arrow">
                                <svg width="7" height="11" viewBox="0 0 7 11" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M1.30859 10.8613C1.46094 10.8613 1.58984 10.8027 1.68945 10.7031L6.33594 6.16211C6.44727 6.05078 6.50586 5.91602 6.50586 5.76953C6.50586 5.61719 6.44727 5.47656 6.33594 5.37695L1.69531 0.841797C1.58984 0.736328 1.46094 0.677734 1.30859 0.677734C1.00391 0.677734 0.775391 0.912109 0.775391 1.2168C0.775391 1.35742 0.833984 1.49805 0.927734 1.59766L5.19336 5.76953L0.927734 9.94141C0.833984 10.041 0.775391 10.1758 0.775391 10.3223C0.775391 10.627 1.00391 10.8613 1.30859 10.8613Z"
                                        fill="#38302C" fillOpacity="0.4"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    )
})


function mapStateToProps(state) {
    return {
        userId: state.userInfo.userId,
        listId:  state.playerListInfo.list._id,
        list: state.playerListInfo.list
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setTextEditorId: (data) => {
            dispatch({
                type: SET_TEXT_EDITOR_ID,
                payload: data
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterTextEditorsContainer);
