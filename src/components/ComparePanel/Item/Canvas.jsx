import React, { Component } from 'react';
import { canvasRenderer } from '../../../core/drawing/canvasRenderer';

export class Canvas extends Component {
    shouldComponentUpdate(nextProps) {
        return nextProps.item.id !== this.props.item.id || 
            nextProps.projection.name !== this.props.projection.name;
    }

    componentDidMount() {
        canvasRenderer.draw(this.canvas, this.props.projection.url, this.props.projection.imageSizes);
    }

    componentDidUpdate() {
        canvasRenderer.draw(this.canvas, this.props.projection.url, this.props.projection.imageSizes);
    }

    render() {
        return (
            <canvas 
                className="item__canvas" 
                style={{ width: `${this.props.size.width}px`, height: `${this.props.size.height}px` }}
                ref={c => this.canvas = c}>
            </canvas>
        );
    }
};