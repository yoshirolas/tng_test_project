import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from './actions';
import { ItemBox } from '../../components/ControlPanel/ItemBox';
import ReactIScroll from 'react-iscroll';
import iScroll from 'iscroll';
import './controlPanel.css';


export class ControlPanel extends Component {
    itemHoveredHandler(item, mode) {
        if (!this.props.currentItems.filter(i => i.id === item.id).length) {
            this.props.switchItem(item, mode);
        }
    }

    isItemActive(item) {
        return this.props.currentItems.find(i => i.id === item.id);
    }

    render() {
        const itemWidth = 15;
        const itemHeight = 13;
        const computedWidth = itemWidth * Object.keys(this.props.modes).reduce((sum, mode) => {
            return sum + this.props.modes[mode].items.length;
        }, 0) + 'em';
        const options = {
            mouseWheel: true,
            scrollbars: true,
            scrollX: true,
            scrollY: false
        };
        //media query for landscape orientation
        const mediaQuery = window.matchMedia( "(orientation: landscape)" );
        let computedHeight;
        if (mediaQuery.matches) {
            computedHeight = itemHeight * Object.keys(this.props.modes).reduce((sum, mode) => {
                return sum + this.props.modes[mode].items.length;
            }, 0) + 'em';
            options.scrollX = false;
            options.scrollY = true;
        }

        return (
            <div className="control-panel">
                <ReactIScroll iScroll={iScroll} options={options}>
                    <div 
                        className="iscroll-wrap" 
                        style={mediaQuery.matches ? { height: computedHeight } : { width: computedWidth }}
                    >
                        <ul>
                            {
                                Object.keys(this.props.modes).map(mode =>
                                    this.props.modes[mode].items.map(item => 
                                        <ItemBox 

                                            item={item} 
                                            isActive={this.isItemActive(item)} 
                                            measureMode={this.props.measureMode}
                                            onHovered={this.itemHoveredHandler.bind(this, item, mode)} 
                                        />
                                    )
                                )
                            }
                        </ul>
                    </div>
                </ReactIScroll>
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        modes: state.ControlPanel.modes,
        currentItems: state.ControlPanel.currentItems,
        measureMode: state.ViewSettingsPanel.measureMode,
    };
};

let mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ControlPanel);