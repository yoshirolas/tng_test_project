import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Root } from './containers/Root';
import reducer from './containers/rootReducer';

const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export const App = () => {
    return (
        <Provider store={store}>
            <Root />
        </Provider>
    );
};