import React from 'react';
import ControlPanel from './ControlPanel/ControlPanel';
import ComparePanel from './ComparePanel/ComparePanel';
import './root.css';

export const Root = () => (
    <div className="tangiblee-app">
        <ComparePanel />
        <ControlPanel />
    </div>
);
