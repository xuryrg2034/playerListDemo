import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Scrollbars  } from 'react-custom-scrollbars';
import "../styles/customSelectOfFormik.scss";

class CustomSelect extends Component {
    constructor(p) {
        super(p);

        this.state = {
            isOpen: false,
            selectedElem: []
        };
    }

    componentDidMount() {
        if(this.props.multiply) {
            const defaultValue = !this.props.value ? [] : this.props.value.split(',').map((el, index) => (el.trim()[0].toUpperCase() + el.trim().slice(1)));
            this.setState({
                selectedElem: this.props.options.map(el => {
                    const selected = defaultValue.some(val => el.id === val);
                    return {id: el.id.toLowerCase(), display: el.display, selected};
                })
            })
        }
    }

    _close = () => {
        this.setState({ isOpen: false });
        if(this.props.onCloseCallback) this.props.onCloseCallback();
    };
    _open = () => this.setState({ isOpen: true });


    render() {
        const { isOpen } = this.state;
        return (
            <div
                className={`custom-select custom-list-select ${isOpen ? "open" : "closed"}`}
                style={{...this.props.style}}>
                <div
                    className={`custom-select__label-wrapper`}
                    onClick={isOpen ? this._close : this._open}>
                    {this.props.label && <div className={`custom-select__label`}>{this.props.label}</div>}

                    <div className="field">
                        <div className="display">{this._renderDisplay()}</div>
                        <div className="button"></div>
                    </div>
                </div>
                {
                    isOpen ?
                        <div className={`options-wrapper ${this.props.btnWithinList ? 'options-wrapper-withBtnCallback' : ''}`}>
                            <div className={`options`}>
                                <Scrollbars
                                    className={`options__customSelect`}
                                    autoHeight={true}
                                    // autoHeightMax={`100%`}
                                    // style={{height: `100%`, maxHeight: `100%`}}
                                >
                                    {this._renderOptions()}
                                </Scrollbars>
                            </div>
                            {
                                this.props.btnWithinList
                                && <div className={`options__btnCallback`}>
                                    <div className={`options__btnCallback_btn`} onClick={() => {
                                        this.props.btnWithinList.callback();
                                        this._close()
                                    }}>{this.props.btnWithinList.btnText}</div>
                                </div>
                            }
                        </div>
                        : null
                }
                {isOpen ? <div className="overlay" onClick={this._close} /> : null}
            </div>
        );
    }

    _handleClick = value => () => {
        if(this.props.multiply) {
            this._setSelectedElem(value);
            const finalValue = this.state.selectedElem.filter(el => el.selected).reduce((acc, el) => {
                acc.push(el.id)
                return acc;
            }, []).join(', ');

            this._setValue(finalValue)
        } else {
            this._setValue(value);
            this._close();
        }
    };

    _renderDisplay = () => {
        const { options, value, placeholder, multiply, formatDisplay } = this.props;
        let found = {};
        if(multiply) {
            found.display = this.state.selectedElem
                .filter(el => el.selected)
                .reduce((acc, el) => {
                    acc.push(el.display)
                    return acc;
                }, []).join(', ');

            if(found.display.trim() === '') found = false;
        } else {
            found = options.find(option => option.id === value);
        }

        if (found) return formatDisplay(found.display);
        return placeholder;
    };

    _renderOptions = () => {
        let comparisonCondition;

        return this.props.options.map(option => {
            if(this.props.multiply) {
                comparisonCondition = this.state.selectedElem.find(el =>  el.id.toLowerCase() === option.id.toLowerCase()).selected
            } else {
                comparisonCondition = option.id === this.props.value;
            }

            return (
                <div
                    className={`option ${comparisonCondition ? "active" : ""}`}
                    key={option.id}
                    onClick={this._handleClick(option.id)}
                >
                    {option.display}
                </div>
            )
        });
    };

    _setValue = value => {
        this.props.setFieldValue(this.props.name, value);
    };

    _setSelectedElem = value => {
        const updateState = this.state.selectedElem.map(el => {
            if(el.id.toLowerCase() === value.toLowerCase()) el.selected = !el.selected;
            return el;
        })

        this.setState({selectedElem: updateState});
    }
}

CustomSelect.defaultProps = {
    placeholder: 'Не выбрано',
    style: {},
    onCloseCallback: null,
    btnWithinList: null,
    formatDisplay: (string) => string
};

CustomSelect.propTypes = {
    placeholder: PropTypes.string,
    style: PropTypes.object
}

export default CustomSelect;
