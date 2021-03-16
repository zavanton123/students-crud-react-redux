import React, {useEffect} from 'react';
import {Link, useHistory} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import {getErrorSelector, getLoadingSelector, getStudentsSelector, studentDelete, studentsLoad} from "../StudentSlice";

export const StudentList = () => {
  // get dispatch via hook
  const dispatch = useDispatch();

  // get selectors via hooks
  const students = useSelector(getStudentsSelector);
  const loading = useSelector(getLoadingSelector);
  const error = useSelector(getErrorSelector);

  // use react router history hook to get navigation 'history' object
  const history = useHistory();

  // use effect hook to fetch students from API as the component is shown
  useEffect(() => {
    // dispatch a thunk
    dispatch(studentsLoad());
  }, []);

  // navigate to edit student screen
  const onStudentEdit = (studentId) => history.push(`/edit/${studentId}`)

  // delete student and reload students via a thunk
  const onStudentDelete = (studentId) => dispatch(studentDelete(studentId));

  // render contents
  let content = null;

  if (error) {
    content = <p>Some error...</p>
  }

  if (loading) {
    content = <p>Loading...</p>
  }

  if (!(students && students.length)) {
    content = <p>No students loaded</p>;
  } else {
    content = <ul>{
      students.map(student =>
        (<li key={student.id}>

          <FontAwesomeIcon
            onClick={() => onStudentEdit(student.id)}
            icon={faEdit}/>
          <span>    </span>

          <FontAwesomeIcon
            onClick={() => onStudentDelete(student.id)}
            icon={faTrashAlt}/>
          <span>    </span>

          <Link to={`/${student.id}`}>{student.last_name}</Link>
        </li>)
      )
    }</ul>
  }

  return (
    <>
      <div className="container">
        <h1>Student List</h1>
        {content}
      </div>
    </>
  );
};
