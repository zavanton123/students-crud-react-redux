import React, {useEffect, useState} from 'react';
import {getStudentById, updateStudent} from "../api/StudentService";
import {useHistory, useParams} from "react-router-dom";

export const EditStudent = () => {
  // local state (not redux store)
  const [id, setId] = useState();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gpa, setGpa] = useState(0.0);
  const [error, setError] = useState();

  // use some hooks
  const history = useHistory();
  const {studentId} = useParams();

  useEffect(() => {
    getStudentById(studentId)
      .then(student => {
        setId(student.id);
        setFirstName(student.first_name);
        setLastName(student.last_name);
        setGpa(student.gpa);
      })
      .catch(() => console.log(`zavanton - error: ${error}`));
  }, [])

  const onFirstNameChange = (event) => setFirstName(event.target.value);
  const onLastNameChange = (event) => setLastName(event.target.value)
  const onGpaChange = (event) => setGpa(event.target.value)

  const onSubmit = (event) => {
    event.preventDefault();

    updateStudent(createStudent())
      .then(response => {
        // navigate to students list on success
        if (response.status == 200) {
          history.push('/');
        } else {
          setError(`Error status code: ${response.status}`);
        }
      })
      .catch(error => setError(error));
  }

  const createStudent = () => ({
    id: id,
    first_name: firstName,
    last_name: lastName,
    gpa: gpa
  });

  let errorMessage;
  if (error) {
    errorMessage = <h3>Failed to update student!</h3>;
  }

  return (
    <>
      <div className="container">
        <h1>Edit Student</h1>
        {errorMessage}
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>First name:</label>
            <input
              onChange={onFirstNameChange}
              value={firstName}
              className="form-control" type="text" placeholder="Enter first name"/>
          </div>
          <div>
            <label>Last name:</label>
            <input
              onChange={onLastNameChange}
              value={lastName}
              className="form-control" type="text" placeholder="Enter last name"/>
          </div>
          <div>
            <label>GPA</label>
            <input
              onChange={onGpaChange}
              value={gpa}
              className="form-control" type="number" placeholder="Enter GPA" step="0.1" min="0.0" max="5.0"/>
          </div>
          <input className="btn btn-primary" type="submit" value="Register"/>
        </form>
      </div>
    </>
  );
}
