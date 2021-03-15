import React, {useContext, useEffect} from 'react';
import {StudentServiceContext} from "../api/StudentService";
import {Link, useHistory} from "react-router-dom";
import {connect} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {studentsLoaded, studentsLoadError, studentsLoading} from "../actions/StudentActions";
import {faEdit, faTrashAlt} from "@fortawesome/free-solid-svg-icons";

// 'state' and 'dispatch' are mapped to props by react redux 'connect' function call
const StudentList = (props) => {
  const {
    // state
    students, loading, error,
    // actions
    studentsLoading, studentsLoaded, studentsLoadError
  } = props;

  // use context hook to get CRUD API service
  const studentService = useContext(StudentServiceContext);

  // use react router history hook to get navigation 'history' object
  const history = useHistory();

  function loadStudents() {
    // dispatch loading action
    studentsLoading();

    studentService
      .getStudents()
      .then(data => {
        // dispatch load success action with students payload
        return studentsLoaded(data);
      })
      .catch(error => {
        console.log(`zavanton - error: ${error}`);
        // dispatch error action
        studentsLoadError()
      });
  }

  // use effect hook to fetch students from API as the component is shown
  useEffect(() => {
    loadStudents();
  }, [])

  // navigate to edit student screen
  const onStudentEdit = (studentId) => history.push(`/edit/${studentId}`)

  // delete student and reload students
  const onStudentDelete = (studentId) => {
    studentService.deleteStudent(studentId)
      .then(response => {
        if (response.status === 204) {
          loadStudents();
        }
      })
      .catch(error => {
        console.log(`zavanton - error: ${error}`);
        // dispatch error action
        studentsLoadError()
      });
  }

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
}

const mapStateToProps = (state) => ({
  students: state.students.students,
  loading: state.students.loading,
  error: state.students.error
})

// react redux 'connect' function
// provides state and actions to this component via props
export default connect(mapStateToProps, {
  studentsLoading,
  studentsLoaded,
  studentsLoadError
})(StudentList);