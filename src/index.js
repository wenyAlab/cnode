import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './App';
import myReducer from './reducers/reducer';
import Detail from './Detail';
import Login from './Login';
import UserPage from './UserPage';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router , Route } from 'react-router-dom';

// const store = createStore(myReducer);
// const init = store.getState();
// console.log(init);
ReactDOM.render(
    (
        // <Provider store={store}>
            <Router>
                <div>
                    <Route path="/" exact component={App}/>
                    <Route path="/detail/:id" component={Detail}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/user/:loginname" component={UserPage}/>
                </div>
            </Router>
        // </Provider>
    ),
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

