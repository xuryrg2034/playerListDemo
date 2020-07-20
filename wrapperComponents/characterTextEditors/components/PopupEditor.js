import React from 'react';
import CKEditorComponent from "../../../components/textEditor/containers/ckEditorComponent";
import {connect} from "react-redux";
import editorsList from "../../../static/editorsList";
import updateTextFieldAction from "../../../uiComponents/actions/updateTextFieldAction";
import '../styles/popupEditor.scss';
import {SET_TEXT_EDITOR_ID} from "../../../constants";


const TabsEditor = React.memo((props) => {
    // props.textEditorId
    // textEditorId
    // listInfo
    if(!props.textEditorId) return null;

    const textEditorInfo = editorsList.find(el => el.id === props.textEditorId);

    return(
        <div className={`popupEditor`}>
            <div className={`popupEditor__header headerMobile headerMobile-paddingNull headerMobile-withTitle`}>
                <div className={`btnGoBack`} onClick={props.setTextEditorId}>Назад</div>
                <div className={`headerMobile__title`}>{textEditorInfo.title}</div>
            </div>
            <CKEditorComponent
                value={props.listInfo[props.textEditorId]}
                placeholder={textEditorInfo.placeholder}
                onBlur={(val, editor) =>
                    props.updateTextField({
                        text: editor.getData(),
                        fieldKey: props.textEditorId,
                        userId: props.userId,
                        listId: props.listId,
                    })}
            />
        </div>
    )
});

function stateProps(state) {
    return {
        textEditorId: state.playerListInfo.mobileState.textEditorId,
        listInfo: state.playerListInfo.list,
        userId: state.userInfo.userId,
        listId:  state.playerListInfo.list._id,
    }
}

function stateDispatch(dispatch) {
    return {
        setTextEditorId: () => {
            dispatch({
                type: SET_TEXT_EDITOR_ID,
                payload: ''
            })
        },
        updateTextField: ({ text, listId, fieldKey, userId}) => {
            const objData = {
                listId,
                userId,
                value: text,
                fieldKey: fieldKey
            };

            dispatch(updateTextFieldAction(objData))
        }
    }
}

export default connect(stateProps, stateDispatch)(TabsEditor);