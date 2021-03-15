import React, {useContext, useState} from 'react';
import {StudentServiceContext} from "../api/StudentService";
import {useHistory} from 'react-router-dom'

export const AddStudent = () => {
  const studentService = useContext(StudentServiceContext);
  const history = useHistory();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gpa, setGpa] = useState(0.0);
  const [error, setError] = useState();

  const onFirstNameChange = (event) => setFirstName(event.target.value);
  const onLastNameChange = (event) => setLastName(event.target.value)
  const onGpaChange = (event) => setGpa(event.target.value)

  const onSubmit = (event) => {
    event.preventDefault();
    studentService.addStudent(createStudent())
      .then(response => {
        if (response.status === 201) {
          history.push('/');
        } else {
          setError(`Status code: ${response.status}`);
        }
      })
      .catch(error => setError(error));
  }

  const createStudent = () => ({
    first_name: firstName,
    last_name: lastName,
    gpa: gpa
  });

  let errorMessage;
  if (error) {
    errorMessage = <h3>Failed to add student!</h3>;
  }

  return (
    <>
      <div className="container">
        <h1>Add Student</h1>
        {errorMessage}
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>First name:</label>
            <input
              onChange={onFirstNameChange}
              className="form-control" type="text" placeholder="Enter first name"/>
          </div>
          <div>
            <label>Last name:</label>
            <input
              onChange={onLastNameChange}
              className="form-control" type="text" placeholder="Enter last name"/>
          </div>
          <div>
            <label>GPA</label>
            <input
              onChange={onGpaChange}
              className="form-control" type="number" placeholder="Enter GPA" step="0.1" min="0.0" max="5.0"/>
          </div>
          <input className="btn btn-primary" type="submit" value="Register"/>
        </form>
      </div>
    </>
  );
}