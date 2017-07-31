import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import rootReducer from './reducers/index';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';

import Navbar from './components/navbar';
import Footer from './components/footer';
import Splash from './components/splash';
import App from './components/app';

const createStoreWithMiddleware = applyMiddleware(promise, thunk)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(rootReducer)}>
        <Router>
            <div>
                <Route exact path='/' component={Splash} />
                <Route path='/home' component={App} />
             </div>
        </Router>
    </Provider>,
    document.getElementById('root')
);
