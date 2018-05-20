import React from 'react';
import ControlPanel from './ControlPanel/ControlPanel';
import ComparePanel from './ComparePanel/ComparePanel';
import ViewSettingsPanel from './ViewSettingsPanel/ViewSettingsPanel';
import './root.css';

export const Root = () => (
    <div className="tangiblee-app">
        <ComparePanel />
        <ViewSettingsPanel />
        <ControlPanel />
    </div>
);
