import React from 'react';
import {connect} from "react-redux";
import updateTextFieldAction from "../../../uiComponents/actions/updateTextFieldAction";
import CKEditorComponent from "../../../components/textEditor/containers/ckEditorComponent";
import '../styles/notesWrapper.scss';


const NotesBlockContainer = React.memo((props) => {
  return(
      <div className={`playerListContainer__block`}>
          <div className={`notesWrapper`}>
              <CKEditorComponent
                  value={props.battleNotes}
                  placeholder={`Добавить заметку...`}
                  onBlur={(val, editor) =>
                      props.updateTextField({
                          text: editor.getData(),
                          fieldKey: `battleNotes`,
                          userId: props.userId,
                          listId: props.listId,
                      })}
              />
          </div>
      </div>
  )
});


function mapStateToProps(state) {
  return {

    listId:  state.playerListInfo.list._id,
    battleNotes: state.playerListInfo.list.battleNotes
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

export default connect(mapStateToProps, mapDispatchToProps)(NotesBlockContainer);