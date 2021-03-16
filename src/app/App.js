import React from 'react';
import {EditStudent} from "../components/EditStudent";
import {Route, Switch} from 'react-router-dom'
import Header from "../components/Header";
import StudentList from "../components/StudentList";
import StudentDetails from "../components/StudentDetails";
import {AddStudent} from "../components/AddStudent";

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
