import React  from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import ckeditorConfig from "../../../pluginConfigs/ckeditorConfig";
import InlineEditor from "@ckeditor/ckeditor5-build-inline";
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Scrollbars  } from 'react-custom-scrollbars';
import '../styles/editorStyle.scss'


const CKEditorComponent = React.memo((props) => {
    const toolbarWrapper = React.createRef();

    return(
        <div className={'ck-editor-custom-style'} >
            <div className={`ck-editor-custom-toolbar`} ref={toolbarWrapper}/>
            <Scrollbars
                className={'ck-editor-custom-style__customScrollbar'}
                autoHide={true}
                autoHeight={true}
                autoHeightMax={`100%`}
                style={{height: `100%`, maxHeight: `100%`}}
            >
                <CKEditor
                    config={{...ckeditorConfig, placeholder: props.placeholder}}
                    editor={ InlineEditor }
                    placeholder={props.placeholder}
                    data={props.value}
                    onInit={editor => {
                        if(toolbarWrapper.current)
                            toolbarWrapper.current.prepend(editor.ui.view.panel.element);
                    }}
                    onBlur={props.onBlur}
                />
            </Scrollbars>
        </div>
    )
});

export default CKEditorComponent;