import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import 'bootstrap/dist/css/bootstrap.css';
import {BrowserRouter as Router} from "react-router-dom";
import {Provider} from "react-redux";
import ErrorBoundary from "./error/ErrorBoundary";
import {store} from "./app/Store";


ReactDOM.render(
  <ErrorBoundary>
    {/* provide store to features */}
    <Provider store={store}>
      <Router>
        <App/>
      </Router>
    </Provider>
  </ErrorBoundary>,
  document.getElementById('root')
);