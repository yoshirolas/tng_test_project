import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from './actions';
import './ViewSettingsPanel.css';

const switchOnStyle = {
    'backgroundColor': '#0e93dd',
    'color': 'white'
}

export class ViewSettingsPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            measureMode: localStorage.getItem('measureMode') || this.props.measureMode
        }
    }

    componentDidMount() {
        this.props.setMeasureMode(this.state.measureMode);
    }

    handleOnCmMode = () => {
        localStorage.setItem('measureMode', 'cm');
        this.setState({
            measureMode: 'cm'
        })
        setTimeout(() => this.props.setMeasureMode(this.state.measureMode), 0);
    }

    handleOnInchMode = () => {
        localStorage.setItem('measureMode', 'inch');
        this.setState({
            measureMode: 'inch'
        });
        setTimeout(() => this.props.setMeasureMode(this.state.measureMode), 0);
    }

    render() {

        return (
            <div className="viewSettings-panel">
                <div className="viewSettings-panel__switch">
                    <div 
                        className="viewSettings-panel__switch__item" 
                        style={this.state.measureMode === 'cm' ? switchOnStyle : {}}
                        onClick={this.handleOnCmMode}
                    >
                        CM
                    </div>
                    <div 
                        className="viewSettings-panel__switch__item"
                        style={this.state.measureMode === 'inch' ? switchOnStyle : {}}
                        onClick={this.handleOnInchMode}
                    >
                        IN
                    </div>
                </div>
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        measureMode: state.ViewSettingsPanel.measureMode,
    };
};

let mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ViewSettingsPanel);