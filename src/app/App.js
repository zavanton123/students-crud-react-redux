import React from 'react';
import {EditStudent} from "../features/student/components/EditStudent";
import {Route, Switch} from 'react-router-dom'
import Header from "../features/student/components/Header";
import {AddStudent} from "../features/student/components/AddStudent";
import {StudentList} from "../features/student/components/StudentList";
import {StudentDetails} from "../features/student/components/StudentDetails";

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
