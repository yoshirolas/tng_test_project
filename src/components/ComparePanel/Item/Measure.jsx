import React from 'react';
import './measure.css';

export const Measure = (props) => {
    const measureStyle = {
        width: props.width,
        top: props.top,
        left: props.left,
        WebkitTransform: `rotate(${props.deg}deg)`,
        MsTransform: `rotate(${props.deg}deg)`,
        transform: `rotate(${props.deg}deg)`,
        WebkitTransformOrigin: `${props.transformOriginX}px ${props.transformOriginY}px 0`,
        MsTransformOrigin: `${props.transformOriginX}px ${props.transformOriginY}px 0`,
        transformOrigin: `${props.transformOriginX}px ${props.transformOriginY}px 0`
    };
    const arrowStyle = {
        width: props.arrowWidth
    };
    const textStyle = {
        top: props.text.top,
        left: props.text.left,
        width: props.text.width
    };

    return (<div className="measure" style={measureStyle}>
        <div className="measure__left" style={arrowStyle}>
            <div className="measure__arrow"></div>
        </div>
        <div className="measure__text" style={textStyle}>{props.text.caption}</div>
        <div className="measure__right" style={arrowStyle}>
            <div className="measure__arrow"></div>
        </div>
    </div>);
};