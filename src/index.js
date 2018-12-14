import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk  from 'redux-thunk';
import App from './App';
import myReducer from './reducers/reducer';
import createBrowserHistory from "history/createBrowserHistory";
import Author from './containers/Author';
import { Detail, Login, UserPage, Create, Collection } from './containers'
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
                    <Route path="/login" component={Login}/>
                    <Route path="/detail/:id" component={Detail}/>
                    <Route path="/user/:loginname" component={UserPage}/>
                    {/*
                        把需要进行拦截的路由（登录验证）写成Author组件来进行路由拦截
                    */}
                    <Author path="/create" component={Create}/>
                    <Author path="/collection" component={Collection}/>
                </div>
            </Router>
        </Provider>
    ),
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

