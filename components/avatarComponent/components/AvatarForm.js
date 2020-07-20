import React, {useState, useRef} from 'react';
import {Formik} from "formik";
import uploadAvatarAction from "../actions/uploadAvatarAction";
import {connect} from "react-redux";


const AvatarForm = (props) => {
    const [pending, setPending] = useState(false);
    const inputEl = useRef(null);
    return(
        <Formik
            initialValues={{filedata: ''}}
            onSubmit={async (values, actions) => {
                if(pending) return false;

                setPending(true);
                // userId
                // listId
                await props.uploadAvatar({
                    file: values.filedata,
                    listId: props.listId,
                    userId: props.userId
                });
                actions.resetForm();
                if(inputEl.current) inputEl.current.value = '';

                setPending(false);
            }}
        >
            {(formikProps) => {
                return (
                    <div className={`avatarForm-wrapper`}>
                        {pending && <div className={`avatarBlock__loader`} />}
                        <div className={`avatarForm`} disabled={pending}>
                            <label className={`avatarForm__label`}>
                                <div className={`avatarForm__label_text`}>Загрузить портрет</div>
                                <input className={`avatarForm__input`} name="filedata" type="file" ref={inputEl} onChange={(e) => {
                                    formikProps.setFieldValue("filedata", e.currentTarget.files[0]);
                                    formikProps.submitForm();
                                }}/>
                            </label>
                        </div>
                    </div>
                );
            }}
        </Formik>
    )
};

function stateProps(state) {
    return {

        listId:  state.playerListInfo.list._id,
    }
}

function dispatchProps(dispatch) {
    return {
        uploadAvatar: (data) => {
            return dispatch(uploadAvatarAction(data));
        }
    }
}

export default connect(stateProps, dispatchProps)(AvatarForm) ;