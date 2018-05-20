import React, {Component} from 'react';
import { Draggable } from './Draggable';
import { 
    ITEM_MARGIN_TOP, 
    ITEM_MARGIN_LEFT, 
    DEFAULT_ZINDEX,
    ACTIVE_ZINDEX,
} from '../../constants/ui';
import './drag.css';

export class DragArea extends Component {
    constructor(props) {
        super(props);
        let items = {};
        this.props.children.map((el) => {
            return items[el.props.item.id] = {
                size: el.props.size,
                position: el.props.position
            };
        });
        this.state = {
            isDomReady: false,
            areItemsIntersected: this._areItemsIntersected(items),
            items
        };
    }

    // drag events
    onDragStart(item) {
        // change z-indexes
        let zIndexes = {};
        for(let key in this.state.items) {
            zIndexes[`zIndex__${key}`] = item.id === key ? ACTIVE_ZINDEX : DEFAULT_ZINDEX;
        }
        this.setState(zIndexes);
        if(this.props.onDragStart) {
            this.props.onDragStart();
        }
    }

    onDrag() {
        if(this.props.onDrag) {
            this.props.onDrag();
        }
    }

    onDragEnd(item) {
        //check if intersects
        let items = this.state.items;
        if(items[item.id.toString()]) {
            items[item.id.toString()].position = item.position;
        }
        this.setState({
            areItemsIntersected: this._areItemsIntersected(items),
            items
        });
        if(this.props.onDragStart) {
            this.props.onDragEnd();
        }
    }

    // bounds
    getElemRect(el) {
        const rect = el.getBoundingClientRect();
        return {
            top: rect.top + document.body.scrollTop,
            left: rect.left + document.body.scrollLeft,
            right: rect.right + document.body.scrollLeft,
            bottom: rect.bottom + document.body.scrollTop
        };
    }

    // are items intersected
    _checkCollissions(box1, box2) {
        return ((box1.x1 >= box2.x1 && box1.x1 <= box2.x2) || (box1.x2 >= box2.x1 && box1.x2 <= box2.x2)) &&
            ((box1.y1 >= box2.y1 && box1.y1 <= box2.y2) || (box1.y2 >= box2.y1 && box1.y2 <= box2.y2) || (box1.y1 <= box2.y1 && box1.y2 >= box2.y2));
    }

    _isIntersect(box1, box2) {
        return this._checkCollissions(box1, box2) || this._checkCollissions(box2, box1);
    }

    _areItemsIntersected(items) {
        let compareItems = [];
        for(let key in items) {
            compareItems.push(items[key]);
        }
        let [box1, box2] = compareItems;
        return this._isIntersect(
            {
                x1: box1.position.left,
                y1: box1.position.top,
                x2: box1.position.left + box1.size.width + ITEM_MARGIN_LEFT * 2,
                y2: box1.position.top + box1.size.height + ITEM_MARGIN_TOP * 2
            },
            {
                x1: box2.position.left,
                y1: box2.position.top,
                x2: box2.position.left + box2.size.width + ITEM_MARGIN_LEFT * 2,
                y2: box2.position.top + box2.size.height + ITEM_MARGIN_TOP * 2
            }
        );
    }

    componentDidMount() {
        this.bounds = this.getElemRect(this.dragArea);
        this.setState({isDomReady: true});
    }

    render () {
        return (
            <div 
                className="drag-area" 
                style={{width: this.props.bodySize.width, height: this.props.bodySize.height}} 
                ref={(el) => this.dragArea = el}>
                { 
                    this.state.isDomReady &&
                    this.props.children.map((el) => {
                        return (<Draggable 
                            key={el.props.item.id}
                            itemId = {el.props.item.id}
                            bounds={this.bounds}
                            areItemsIntersected={this.state.areItemsIntersected}
                            zIndex={this.state[`zIndex__${el.props.item.id}` || DEFAULT_ZINDEX]}
                            position={ el.props.position }
                            size={ el.props.size }
                            isUnderlying = {el.props.isUnderlying}
                            onDragStart={ this.onDragStart.bind(this) }
                            onDrag={ this.onDrag.bind(this) }
                            onDragEnd={ this.onDragEnd.bind(this) }
                        >
                            { el }
                        </Draggable>);
                    })
                }
            </div>
        );
    }
}