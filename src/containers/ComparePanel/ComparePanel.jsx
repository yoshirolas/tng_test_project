import React, { Component } from 'react';
import { connect } from 'react-redux';
import { calculations } from '../../core/ui/calculations';
import { Header } from '../../components/Header/Header';
import { CompareWithItem } from '../../components/ComparePanel/CompareWithItem';
import './comparePanel.css';

export class ComparePanel extends Component {
    constructor(props) {
        super(props);
        this.state = { domReady: false };
    }

    componentDidMount() {
        this.setState({ domReady: true });
    }

    showCurrentMode(mode, product, item) {
        const
            width = this.comparePanelBody.offsetWidth,
            height = this.comparePanelBody.offsetHeight;
        return (
            <CompareWithItem 
                key={item.id} 
                product={product} 
                item={item} 
                calculations={ calculations(width, height) } 
                bodySize = {{width, height}}
            />)
    }

    render() {
        return (
            <div className="compare-panel">
                <Header mode={this.props.currentMode} productName={this.props.product.name} currentItems={this.props.currentItems} />
                <div className="compare-panel__body" ref={(body) => this.comparePanelBody = body}>
                    {
                        this.state.domReady &&
                        this.showCurrentMode(this.props.currentMode, this.props.product, this.props.currentItems[0])
                    }
                </div>
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        currentMode: state.ControlPanel.currentMode,
        currentItems: state.ControlPanel.currentItems,
        product: state.ComparePanel.product
    };
};


export default connect(mapStateToProps)(ComparePanel);