import {configureStore} from "@reduxjs/toolkit";
import {applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";
import {studentReducer} from "../features/student/StudentSlice";

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

// configureStore is from redux-toolkit package
// the general state is broken into separate states
export const store = configureStore({
  reducer: {
    students: studentReducer
  },
  enhancer: enhancer
})
