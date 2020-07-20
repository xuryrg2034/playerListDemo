import React from 'react';
import CKEditorComponent from "../../../components/textEditor/containers/ckEditorComponent";


const TabsEditor = React.memo((props) => {
    return(
        props.tabs.map(el => (
                <div
                    key={el.id}
                    style={el.id === props.currentEditor ? {display: 'block'} : {display: 'none'}}
                    className={`textEditorTabs`}>
                    <CKEditorComponent
                        value={props.list[el.id]}
                        placeholder={el.placeholder}
                        onBlur={(val, editor) =>
                            props.updateTextField({
                                text: editor.getData(),
                                fieldKey: el.id,
                                userId: props.userId,
                                listId: props.listId,
                            })}
                    />
                </div>
            )
        )
    )
})

export default TabsEditor;