import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import 'bootstrap/dist/css/bootstrap.css';
import {BrowserRouter as Router} from "react-router-dom";
import {applyMiddleware, compose, createStore} from "redux";
import {reducer} from "./reducers/Reducer";
import thunk from "redux-thunk";
import {Provider} from "react-redux";
import ErrorBoundary from "./error/ErrorBoundary";

// enable Redux DevTools
const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk),
);

// create redux store
const store = createStore(reducer, enhancer);

ReactDOM.render(
  <ErrorBoundary>
    {/* provide store to components */}
    <Provider store={store}>
      <Router>
        <App/>
      </Router>
    </Provider>
  </ErrorBoundary>,
  document.getElementById('root')
);