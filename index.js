import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers';
import thunk from "redux-thunk";
import {BrowserRouter as Router, Route} from "react-router-dom";

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
<Provider store={store}>
    <Router>
        <Route path="/" component={App}/>
    </Router>
</Provider>,
document.getElementById('root')
);



serviceWorker.unregister();






