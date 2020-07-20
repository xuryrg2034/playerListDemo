import React, { PureComponent } from 'react';
import {connect} from "react-redux";
import createMagicSpellAction from "../actions/createMagicSpellAction";
import FormMagicSpellPopup from '../components/FormMagicSpellPopup';
import setDefaultPopupStateAction from "../../actions/setDefaultPopupStateAction";
import setPopupStateAction from "../../actions/setPopupStateAction";
import deleteMagicSpellAction from "../actions/deleteMagicSpellAction";
import updateMagicSpellAction from "../actions/updateMagicSpellAction";
import stopScroll from "../../../../utils/stopScroll";
import '../../styles/magicSpellPopup.scss';
import FormMagicSpellSkeleton from "../components/FormMagicSpellSkeleton";


class FormMagicSpellPopupContainer extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            disabled: false
        };

        this.updateMagicSpell = this.updateMagicSpell.bind(this);
        this.deleteMagicSpell = this.deleteMagicSpell.bind(this);
    }


    async componentDidMount() {
        stopScroll.scroll(false);
        const {popupState, setPopupStateAction, playerListId, createMagicSpell, setDefaultPopupStateAction} = this.props;
        if(popupState.type === 'create') {
            const resp = await createMagicSpell({playerListId});

            setPopupStateAction({spellId: resp.id, type: 'update'});

            if(!resp.success) {
                setDefaultPopupStateAction();
                stopScroll.scroll(true);
            }
        }
    }

    componentWillUnmount() {
        stopScroll.scroll(true);
        // const magicSpell = this.props.magicSpells[this.props.popupState.spellId];
        //
        // if(magicSpell && (!magicSpell.title || !magicSpell.title.trim())) {
        //     this.deleteMagicSpell({spellId: this.props.popupState.spellId})
        // }
    }

    async updateMagicSpell(data) {
        this.setState({disabled: true});
        const magicSpell = this.props.magicSpells[this.props.popupState.spellId] || {};

        const info = Object.keys(data).reduce((acc, key) => {
            if(data[key] !== magicSpell[key]) acc[key] = data[key];
            return acc;
        }, {});

        if(Object.keys(info).length) {
            await this.props.updateMagicSpellAction({
                spellId: this.props.popupState.spellId,
                info
            });
        }

        this.setState({disabled: false});
    }

    async deleteMagicSpell() {
        if(this.state.disabled) return false;
        this.setState({disabled: true});
        const resp = await this.props.deleteMagicSpellAction({
            spellId: this.props.popupState.spellId,
        });
        if(resp.success) this.props.setDefaultPopupStateAction();
    };


    render() {
        const { cellsOfMagic, popupState, classes, isMobile } = this.props;
        if(!popupState.spellId) return <FormMagicSpellSkeleton />;

        const magicSpell = this.props.magicSpells[this.props.popupState.spellId] || {};

        return(
            <div className={`popupWrapper`}>
                <div className={'popupBlock magicSpellPopup'}>
                    {
                        isMobile
                            ? <div className="popupBlock__headerMobile headerMobile headerMobile-paddingNull">
                                <div className="btnGoBack"
                                     onClick={this.props.setDefaultPopupStateAction}
                                >Заклинания</div>
                                <div
                                    className="popupBlock__submitBtn"
                                    onClick={this.deleteMagicSpell}
                                >Удалить заклинание</div>
                            </div>
                            : <div className="popupBlock__btnClose" onClick={this.props.setDefaultPopupStateAction}>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M2.90909 0L0 2.90909L5.09091 8L0 13.0909L2.90909 16L8 10.9091L13.0909 16L16 13.0909L10.9091 8L16 2.90909L13.0909 0L8 5.09091L2.90909 0Z"
                                        fill="#38302C" />
                                </svg>
                            </div>

                    }
                    <FormMagicSpellPopup
                        isMobile={isMobile}
                        magicSpell={magicSpell}
                        classes={classes}
                        cellsOfMagic={cellsOfMagic}
                        onSubmit={this.updateMagicSpell}
                        disabled={this.state.disabled}
                        deleteMagicSpell={this.deleteMagicSpell}/>
                </div>
                <div className={`popupOverlay`} onClick={this.props.setDefaultPopupStateAction} />
            </div>
        )
    }
}


function  mapStateToProps(state) {
    return {
        playerListId:  state.playerListInfo.list._id,
        classes:  state.playerListInfo.list.classes,
        cellsOfMagic: state.playerListInfo.list.cellsOfMagic,
        popupState: state.magicSpells.popupState,
        magicSpells: state.magicSpells.magicSpellsList
    };
}

function  mapDispatchToProps(dispatch) {
    return {
        createMagicSpell: (data) => {
            return dispatch(createMagicSpellAction(data));
        },
        updateMagicSpellAction: (data) => {
            dispatch(updateMagicSpellAction(data))
        },
        deleteMagicSpellAction: (data) => {
            return dispatch(deleteMagicSpellAction(data))
        },
        setDefaultPopupStateAction: () => {
            dispatch(setDefaultPopupStateAction())
        },
        setPopupStateAction: (data) => {
            dispatch(setPopupStateAction(data))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormMagicSpellPopupContainer);
