import React from 'react';
import parse from 'html-react-parser';
import '../styles/warningMessageBlock.scss';

const WarningMessageBlock = (props) => (
    <div className={`warningMessage ${props.isMobile ? 'warningMessage-mobile' : ''} ${props.success ? 'warningMessage-success' : ''}`} onClick={props.cleanMessage}>
        <div className={`warningMessage__text`}>{parse(props.message)}</div>
    </div>
);

export default WarningMessageBlock;