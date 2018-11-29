import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk  from 'redux-thunk';
import App from './App';
import myReducer from './reducers/reducer';
import createBrowserHistory from "history/createBrowserHistory";

import Detail from './Detail';
import Login from './Login';
import UserPage from './UserPage';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router , Route } from 'react-router-dom';

// redux devtool
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    myReducer,
    composeEnhancers(applyMiddleware(thunk)),
);
const history = createBrowserHistory();

ReactDOM.render(
    (
        <Provider store={store}>
            <Router history={history}>
                <div>
                    <Route path="/" exact component={App}/>
                    <Route path="/detail/:id" component={Detail}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/user/:loginname" component={UserPage}/>
                </div>
            </Router>
        </Provider>
    ),
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

