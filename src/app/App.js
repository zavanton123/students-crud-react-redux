import React from 'react';
import {EditStudent} from "../features/student/EditStudent";
import {Route, Switch} from 'react-router-dom'
import Header from "../features/student/Header";
import StudentList from "../features/student/StudentList";
import StudentDetails from "../features/student/StudentDetails";
import {AddStudent} from "../features/student/AddStudent";

function App() {
  return (
    <>
      <Header/>

      {/* this is dynamic navigation implemented by react router library */}
      <Switch>
        <Route exact path="/" component={StudentList}/>
        <Route exact path="/add" component={AddStudent}/>
        <Route exact path="/:studentId" component={StudentDetails}/>
        <Route exact path="/edit/:studentId" component={EditStudent}/>
      </Switch>
    </>
  );
}

export default App;
