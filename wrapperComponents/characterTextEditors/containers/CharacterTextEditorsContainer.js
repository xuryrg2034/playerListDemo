import React, { useState } from 'react';
import {connect} from "react-redux";
import updateTextFieldAction from "../../../uiComponents/actions/updateTextFieldAction";
import '../styles/characterTextEditors.scss';
import TabsBtn from "../components/TabsBtn";
import TabsEditor from "../components/TabsEditor";
import editorsList from "../../../static/editorsList";


const CharacterTextEditorsContainer = React.memo((props) => {
    const tabs = editorsList;

    const [currentEditor, setCurrentEditor] = useState(localStorage['CharacterInfoContainerEditor'] || tabs[0].id)

    const changeEditor = (id) => {
        setCurrentEditor(id);
        localStorage['CharacterInfoContainerEditor'] = id;
    };

    return(
        <>
            <div className={`textEditorTabsBtnContainer`}>
                <TabsBtn
                    tabs={tabs}
                    currentEditor={currentEditor}
                    changeEditor={changeEditor}/>
            </div>
            <TabsEditor
                tabs={tabs}
                currentEditor={currentEditor}
                listId={props.listId}
                userId={props.userId}
                updateTextField={props.updateTextField}
                list={props.list}/>
        </>
    )
})


function mapStateToProps(state) {
    return {

        listId:  state.playerListInfo.list._id,
        list: state.playerListInfo.list
    }
}

function mapDispatchToProps(dispatch) {
    return {
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

export default connect(mapStateToProps, mapDispatchToProps)(CharacterTextEditorsContainer);
