import React, {useContext, useEffect} from 'react';
import {StudentServiceContext} from "../api/StudentService";
import {Link, useHistory} from "react-router-dom";
import {connect} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {studentsLoaded, studentsLoadError, studentsLoading} from "../actions/StudentActions";
import {faEdit, faTrashAlt} from "@fortawesome/free-solid-svg-icons";

const StudentList = (props) => {
  const {
    students, loading, error, studentsLoading,
    studentsLoaded, studentsLoadError
  } = props;

  const studentService = useContext(StudentServiceContext);
  const history = useHistory();

  function loadStudents() {
    studentsLoading();
    studentService
      .getStudents()
      .then(data => studentsLoaded(data))
      .catch(error => {
        console.log(`zavanton - error: ${error}`);
        studentsLoadError()
      });
  }

  useEffect(() => {
    loadStudents();
  }, [])

  const onStudentEdit = (studentId) => history.push(`/edit/${studentId}`)

  const onStudentDelete = (studentId) => {
    studentService.deleteStudent(studentId)
      .then(response => {
        if (response.status === 204) {
          loadStudents();
        }
      })
      .catch(error => console.log(`zavanton - error: ${error}`));
  }

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

export default connect(mapStateToProps, {
  studentsLoading,
  studentsLoaded,
  studentsLoadError
})(StudentList);