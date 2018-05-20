import React, { Component } from 'react';

export class Draggable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dragging: false,
            top: props.position.top,
            left: props.position.left
        };
        this.onDrag = this.handleMouseMove.bind(this);
        this.onDragEnd = this.handleMouseUp.bind(this);
    }

    componentDidMount() {
        window.addEventListener('mousemove', this.onDrag);
        window.addEventListener('touchmove', this.onDrag);
        window.addEventListener('mouseup', this.onDragEnd);
        window.addEventListener('touchend', this.onDragEnd);
    }

    componentWillUnmount() {
        window.removeEventListener('mousemove', this.onDrag);
        window.removeEventListener('touchmove', this.onDrag);
        window.removeEventListener('mouseup', this.onDragEnd);
        window.removeEventListener('touchend', this.onDragEnd);
    }

    // mouse events
    handleMouseDown(proxy) {
        const event = proxy.nativeEvent;
        const x = event.pageX || event.touches[0].pageX;
        const y = event.pageY || event.touches[0].pageY;
        this.setState((prevState, props) => {
            return {
                dragging: true,
                initialTop: prevState.top,
                initialLeft: prevState.left,
                startX: x - this.props.bounds.left,
                startY: y - this.props.bounds.top
            };
        });
        if (this.props.onDragStart) {
            this.props.onDragStart({id: this.props.itemId});
        }
    }

    handleMouseMove(event) {
        if (this.state.dragging) {
            const x = event.pageX || (event.touches && event.touches[0].pageX);
            const y = event.pageY || (event.touches && event.touches[0].pageY);
            this.setState((prevState, props) => {
                const dx = (x - this.props.bounds.left) - prevState.startX;
                const dy = (y - this.props.bounds.top) - prevState.startY;
                let newTop = prevState.initialTop + dy;
                let newLeft = prevState.initialLeft + dx;
                newTop =
                    newTop > 0 &&
                        (newTop + this.draggable.offsetHeight) <= (this.props.bounds.bottom - this.props.bounds.top) ? newTop : prevState.top;
                newLeft =
                    newLeft > 0 &&
                        (newLeft + this.draggable.offsetWidth) <= (this.props.bounds.right - this.props.bounds.left) ? newLeft : prevState.left;
                return {
                    top: newTop,
                    left: newLeft
                };
            });
            if (this.props.onDrag) {
                this.props.onDrag();
            }
        }
    }

    handleMouseUp() {
        if (this.state.dragging) {
            this.setState({
                dragging: false
            });
            if (this.props.onDragEnd) {
                this.props.onDragEnd({
                    id: this.props.itemId,
                    position: { left: this.state.left, top: this.state.top }
                });
            }
        }
    }

    render() {
        //TODO: move to classnames
        let classes = ['draggable'];
        if (this.state.dragging) {
            classes.push('draggable--dragging');
        }
        if (this.props.areItemsIntersected) {
            classes.push('draggable--intersected');
        }
        if(this.props.isUnderlying) {
            classes.push('draggable--underlying');
        }
        return (
            <div
                onMouseDown={this.handleMouseDown.bind(this)}
                onTouchStart={this.handleMouseDown.bind(this)}
                className={classes.join(' ')}
                ref={(el) => this.draggable = el}
                style={{ top: `${this.state.top}px`, left: `${this.state.left}px`, zIndex: this.props.zIndex }}
            >
                {this.props.children}
            </div>
        );
    }
}