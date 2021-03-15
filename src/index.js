import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import {BrowserRouter as Router} from "react-router-dom";
import StudentService, {StudentServiceContext} from "./api/StudentService";
import {applyMiddleware, compose, createStore} from "redux";
import {reducer} from "./reducers/Reducer";
import thunk from "redux-thunk";
import {Provider} from "react-redux";
import ErrorBoundary from "./error/ErrorBoundary";

const studentService = new StudentService();

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
const store = createStore(reducer, enhancer);

ReactDOM.render(
  <ErrorBoundary>
    <Provider store={store}>
      <StudentServiceContext.Provider value={studentService}>
        <Router>
          <App/>
        </Router>
      </StudentServiceContext.Provider>
    </Provider>
  </ErrorBoundary>,
  document.getElementById('root')
);