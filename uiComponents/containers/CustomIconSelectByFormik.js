import React, { Component } from "react";
import PropTypes from 'prop-types';
import "../styles/customSelectOfFormik.scss";

class CustomIconSelect extends Component {
    state = { isOpen: false };
    _close = () => {
        this.setState({ isOpen: false })
        // if(this.props.onCloseCallback) this.props.onCloseCallback();
    };
    _open = () => this.setState({ isOpen: true });

    render() {
        const { isOpen } = this.state;
        return (
            <div
                onClick={isOpen ? this._close : this._open}
                className={`custom-select custom-icon-select ${isOpen ? "open" : "closed"}`}
                style={{...this.props.style}}>
                <div className="field">
                    <div className="display"><img src={this._renderDisplay()} alt=""/></div>
                    <div className="button" />
                </div>
                {isOpen ? <div className="options">{this._renderOptions()}</div> : null}
                {isOpen ? <div className="overlay" onClick={this._close} /> : null}
            </div>
        );
    }

    _handleClick = value => () => {
        this._setValue(value);
        this._close();
    };

    _renderDisplay = () => {
        const { options, value, placeholder } = this.props;
        const found = options.find(option => option.id === value);

        if (found) return found.display;
        return placeholder;
    };

    _renderOptions = () => {
        return this.props.options.map(option => (
            <div
                className={`option ${option.id === this.props.value ? "active" : ""}`}
                key={option.id}
                onClick={this._handleClick(option.id)}
            >
                <img src={option.display} alt=""/>
            </div>
        ));
    };

    _setValue = value => {
        this.props.setFieldValue(this.props.name, value);
        if(this.props.onChangeCallback) this.props.onChangeCallback();
    };
}

CustomIconSelect.defaultProps = {
    placeholder: 'Значение не выбрано',
    style: {}
};

CustomIconSelect.propTypes = {
    placeholder: PropTypes.string,
    style: PropTypes.object
}

export default CustomIconSelect;
