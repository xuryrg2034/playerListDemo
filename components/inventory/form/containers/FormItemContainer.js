import React, { PureComponent } from 'react';
import {connect} from "react-redux";
import createItemAction from "../actions/createItemAction";
import FormItem from "../components/FormItem";
import '../styles/formItem.scss';
import {Formik} from "formik";
import itemIconArray from "../../../../static/itemIconArray";
import setDefaultPopupStateAction from "../../actions/setDefaultPopupStateAction";
import updateItemAction from "../actions/updateItemAction";
import deleteItemAction from "../actions/deleteItemAction";
import { Scrollbars  } from 'react-custom-scrollbars';
import stopScroll from "../../../../utils/stopScroll";
import FormItemSkeleton from "../components/FormItemSkeleton";
import deleteElemInfoAction from "../../../lists/actions/deleteElemInfoAction";


class FormItemContainer extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            itemId: props.popupState.itemId || '',
            disabled: false
        };

        this.updateItem = this.updateItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }

    async componentDidMount() {
        stopScroll.scroll(false);
        if(this.props.popupState.type === 'create' && !this.state.itemId) {
            const resp = await this.props.createItemAction({listId: this.props.listId});
            if(resp.success) {
                this.setState({itemId: resp.id});
            } else {
                this.props.setDefaultPopupState();
                stopScroll.scroll(true);
            }
        }
    }

    componentWillUnmount() {
        stopScroll.scroll(true);
        // const item = this.props.items[this.state.itemId];
        // if(item && (!item.title || !item.title.trim())) this.deleteItem()
    }

    //Обновления информации о предмете на беке
    updateItem(values) {
        if(this.state.disabled) return false;
        this.props.updateItemAction({listId: this.props.listId, info: values, itemId: this.state.itemId})
    }

    //Удаление предмета
    async deleteItem () {
        if(this.state.disabled) return false;

        this.setState({disabled: true});
        const resp = await this.props.deleteItemAction({
            listId: this.props.listId,
            itemId: this.state.itemId
        });
        if(resp.success) {
            this.props.setDefaultPopupState();
        } else {
            this.setState({disabled: false});
        }
    }

    //Добавление характеристики
    addCharacteristicBonus(setFieldValue, characteristics) {
        setFieldValue('characteristics', [...characteristics, {statId: '', value: ''}])
    }

    //Обновление характеристики
    updateCharacteristicBonus (setFieldValue, characteristics, index, values) {
        const newArray = characteristics.map((el, elIndex) => {
            if(elIndex === index) el = {...el, ...values};
            return el;
        });

        setFieldValue('characteristics', newArray);
    }

    //Удаление характеристики
    deleteCharacteristicBonus (setFieldValue, characteristics, index) {
        const newArray = characteristics.filter((el, elIndex) => elIndex !== index);
        setFieldValue('characteristics', newArray);
    }

    //Добавление атаки
    addAttackBonus (setFieldValue, characteristics) {
        setFieldValue('attacks', [
            ...characteristics,
            {
                statId: '',
                dice: '',
                damage: '',
                penetration: '',

            }
        ])
    }

    //Обновление атаки
    updateAttackBonus (setFieldValue, attacks, index, values) {
        const newArray = attacks.map((el, elIndex) => {
            if(elIndex === index) el = {...el, ...values};
            return el;
        });

        setFieldValue('attacks', newArray);
    }

    //Удаление атаки
    deleteAttackBonus (setFieldValue, attacks, index) {
        const newArray = attacks.filter((el, elIndex) => elIndex !== index);
        setFieldValue('attacks', newArray);
    }

    render() {
        const item = this.props.items[this.state.itemId] || {};
        const initialState = {
            title: item.title || "",
            description: item.description || "",
            shortDescription: item.shortDescription || "",
            wield: item.wield || false,
            equipped: item.equipped || false,
            icon: isNaN(item.icon) ? itemIconArray[0].id : Number(item.icon),
            characteristics: item.characteristics || [],
            attacks: item.attacks || []
        };

        if(!this.state.itemId) return <FormItemSkeleton />;
        return(
            <div className={`popupWrapper popupWrapper-item`}>
                <Scrollbars
                    className={`popupWrapper__customScroll`}
                    autoHide={true}
                >
                    <div className={`popupBlock-wrapper`}>
                        <div className={`popupBlock createItemPopup`}>

                            {
                                this.props.isMobile
                                    ? <div className="popupBlock__headerMobile headerMobile headerMobile-paddingNull">
                                        <div className="btnGoBack"
                                             onClick={this.props.setDefaultPopupState}
                                        >Инвентарь</div>
                                        <div
                                            className="popupBlock__submitBtn"
                                            onClick={this.deleteItem}
                                        >Удалить предмет</div>
                                    </div>
                                    : <div className="popupBlock__btnClose" onClick={this.props.setDefaultPopupState} disabled={this.state.disabled}>
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M2.90909 0L0 2.90909L5.09091 8L0 13.0909L2.90909 16L8 10.9091L13.0909 16L16 13.0909L10.9091 8L16 2.90909L13.0909 0L8 5.09091L2.90909 0Z"
                                                fill="#38302C" />
                                        </svg>
                                    </div>
                            }
                            <Formik
                                initialValues={{...initialState}}
                                validateOnBlur={false}
                                validateOnChange={false}
                                onSubmit={this.updateItem}
                            >
                                {(formikProps) => (
                                    <FormItem
                                        formikProps={formikProps}
                                        characteristics={this.props.characteristics}
                                        addCharacteristicBonus={this.addCharacteristicBonus}
                                        deleteCharacteristicBonus={this.deleteCharacteristicBonus}
                                        updateCharacteristicBonus={this.updateCharacteristicBonus}
                                        addAttackBonus={this.addAttackBonus}
                                        updateAttackBonus={this.updateAttackBonus}
                                        deleteAttackBonus={this.deleteAttackBonus}
                                        deleteItem={this.deleteItem}
                                        isMobile={this.props.isMobile}
                                    />
                                )}
                            </Formik>
                        </div>
                    </div>
                    <div className={`popupOverlay`} onClick={this.props.setDefaultPopupState} disabled={this.state.disabled} />
                </Scrollbars>
            </div>
        )
    }
}

function  mapStateToProps(state) {
    return {

        listId:  state.playerListInfo.list._id,
        characteristics: state.playerListInfo.list.characteristics,
        popupState: state.inventory.popupState,
        items: state.inventory.items
    };
}

function  mapDispatchToProps(dispatch) {
    return {
        createItemAction: (data) => {
            return dispatch(createItemAction(data));
        },
        updateItemAction: (data) => {
            dispatch(updateItemAction(data));
        },
        deleteItemAction: (data) => {
            return dispatch(deleteItemAction(data));
        },
        setDefaultPopupState: () => {
            dispatch(setDefaultPopupStateAction());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormItemContainer);
