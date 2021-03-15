const {StudentReducer} = require("./StudentReducer");
const {combineReducers} = require("redux");


export const reducer = combineReducers({
  students: StudentReducer
});
