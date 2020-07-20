import React, { Component } from "react";
import { connect } from "react-redux";
import ListElementForm from "../components/ListElementForm";
import createListElementAction from "../actions/createListElementAction";
import deleteElemInfoAction from "../actions/deleteElemInfoAction";
import updateElemInfoAction from "../actions/updateElemInfoAction";
import {LIST_POPUP_STATE_DEFAULT} from "../../../constants";
import stopScroll from "../../../utils/stopScroll";
import '../styles/formStyle.scss';
import ListFormSkeleton from "../components/ListFormSkeleton";
import constantsForDevice from "../../../static/constantsForDevice";



class ListElementFormContainer extends Component {
    constructor(props) {
        super(props);

        const listElem = props.lists[props.popupState.featureType][props.popupState.featureId] || {};

        this.state = {
            disabled: false,
            deleted: false,
            id: props.popupState.featureId || '',
            title: listElem.title || '',
            description: listElem.description || ''
        }

        this._deleteFeatureList = this._deleteFeatureList.bind(this);
        this._updateInfo = this._updateInfo.bind(this);
    }


    async componentDidMount() {
        const {popupState, listId, createListElement, setPopupState} = this.props;

        stopScroll.scroll(false);
        if(popupState.type === 'create') {
            const listItemInfo = await createListElement({info: {title: '', description: ''}, listType: popupState.featureType, listId});
            if(listItemInfo.success) {
                this.setState({id: listItemInfo.id});
                setPopupState({featureId: listItemInfo.id});
            } else {
                stopScroll.scroll(true);
                this.props.defaultState();
            }
        }
    }

    componentWillUnmount() {
        stopScroll.scroll(true);
        if(this.state.title.trim() === '') {
            this._deleteFeatureList({listType: this.props.popupState.featureType, id: this.state.id})
        }

        this.props.defaultState();
    }

    _updateInfo(val) {
        const {deleted, disabled} = this.state;
        const {popupState} = this.props;

        if(deleted || disabled) return false;
        this.setState({title: val.title, description: val.description});
        this.props.updateElemInfo({title: val.title, description: val.description, id: popupState.featureId, listType: popupState.featureType})
    }

    async _deleteFeatureList(data) {

        if(this.state.deleted) return false;

        this.setState({deleted: true});
        const resp = await this.props.deleteElemInfoAction(data);
        if(resp.success) this.props.setPopupState({visible: false});
    }

    render() {
        const {_deleteFeatureList, state:{disabled, id}, state} = this;
        const {
            setPopupState,
            popupState,
            listsKey,
            deviceType
        } = this.props;


        if(!id) return <ListFormSkeleton />;
        const currentList = listsKey.find(el => el.key === popupState.featureType);
        const isMobile = deviceType === constantsForDevice.mobile;

        return(
            <div className={'popupWrapper'}>
                <div className={'listPopup popupBlock'}>
                    {
                        isMobile
                            ? <div className="listItem__list_header headerMobile">
                                <div className="btnGoBack"
                                     onClick={() => {
                                         if(disabled) return false;
                                         setPopupState({visible: false})
                                     }}
                                >{currentList.title}</div>
                                <div
                                    className="popupBlock__submitBtn"
                                    onClick={() => deleteElemInfoAction({id, listType: popupState.featureType})}
                                >Удалить умение</div>
                            </div>
                            : <div
                                className={'popupBlock__btnClose'}
                                onClick={() => {
                                    if(disabled) return false;
                                    setPopupState({visible: false})
                                }}
                            >
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.90909 0L0 2.90909L5.09091 8L0 13.0909L2.90909 16L8 10.9091L13.0909 16L16 13.0909L10.9091 8L16 2.90909L13.0909 0L8 5.09091L2.90909 0Z" fill="#38302C"/>
                                </svg>
                            </div>
                    }

                    <ListElementForm
                        isMobile={isMobile}
                        updateInfo={this._updateInfo}
                        title={currentList.title}
                        inputValue={state.title}
                        description={state.description}
                        inputTitlePlaceholder={currentList.declension[0]}
                        deleteElemInfoAction={_deleteFeatureList}
                        listType={popupState.featureType}
                        setState={this.setState}
                        id={id}/>
                </div>
                <div
                    className={'popupOverlay'}
                    onClick={() => {
                        if(disabled) return false;
                        setPopupState({visible: false})
                    }}
                />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        listId:  state.playerListInfo.list._id,
        popupState: state.lists.popupState,
        lists: state.lists.listsInfo,
        deviceType: state.deviceInfo.device.type
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createListElement: (data) => {
            return dispatch(createListElementAction(data));
        },

        updateElemInfo: (data) => {
            return dispatch(updateElemInfoAction(data))
        },

        deleteElemInfoAction: (data) => {
            return dispatch(deleteElemInfoAction(data));
        },

        defaultState: () => {
            dispatch({
                type: LIST_POPUP_STATE_DEFAULT
            })
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListElementFormContainer);
