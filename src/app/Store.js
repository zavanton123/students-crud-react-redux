import React from 'react';
import {configureStore} from "@reduxjs/toolkit";
import {StudentReducer} from "../reducers/StudentReducer";
import {applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";

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


export const store = configureStore({
  reducer: {
    students: StudentReducer
  },
  enhancer: enhancer
})
