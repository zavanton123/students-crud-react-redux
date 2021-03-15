const {StudentReducer} = require("./StudentReducer");
const {combineReducers} = require("redux");

// redux state is broken into substates
// (i.e. state.students, etc.)
// each substate has its own reducer function
export const reducer = combineReducers({
  students: StudentReducer
});
