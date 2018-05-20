import React from 'react';
import './header.css';

export const Header = (props) => (
    <div className="header">
        <div className="header__left">
            <h1 className="header__title">{props.productName}</h1>
            {   
                props.mode !== 'view-in-context' &&
                <h2 className="header__subtitle">compared to {props.currentItems[0].name}</h2>
            }
        </div>
        <div className="header__right">
        </div>
    </div>
);