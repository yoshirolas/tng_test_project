import React from 'react';
import './item.css';
import { Canvas } from './Canvas';
import { Measure } from './Measure';

export const Item = (props) => {
    const projection = props.item.projections.filter((p) => p.active)[0];
    return (
        <div className="item">
            <div>
                <Canvas size={props.size} item={props.item} projection={projection} />
                {
                    props.measures.map((measure, i) => {
                        return <Measure key={i} {...measure} />;
                    })
                }
            </div>
        </div>
    );
};