import React, {useContext, useEffect} from 'react';
import {useParams} from 'react-router-dom'
import {StudentServiceContext} from "../api/StudentService";
import {connect} from "react-redux";
import {currentStudentLoaded, currentStudentLoadError, currentStudentLoading} from "../actions/StudentActions";

const StudentDetails = (props) => {
  const {
    currentStudent, loading, error, currentStudentLoading,
    currentStudentLoadError, currentStudentLoaded
  } = props;

  const {studentId} = useParams();
  const studentService = useContext(StudentServiceContext)

  useEffect(() => {
    currentStudentLoading();
    studentService.getStudentById(studentId)
      .then(data => {
        console.log(`zavanton - student data`);
        console.log(data);
        currentStudentLoaded(data);
      })
      .catch(() => currentStudentLoadError())
  }, []);

  let content = null;

  if (error) {
    content = <p>Some error...</p>;
  }

  if (loading) {
    content = <p>Loading...</p>;
  }

  if (currentStudent) {
    content =
      <>
        <p>{currentStudent.first_name}</p>
        <p>{currentStudent.last_name}</p>
        <p>{currentStudent.gpa}</p>
      </>
  }

  return (
    <>
      <div className="container">
        <h1>Student Details</h1>
        {content}
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  currentStudent: state.students.currentStudent,
  loading: state.students.loading,
  error: state.students.error
})

export default connect(mapStateToProps, {
  currentStudentLoading,
  currentStudentLoaded,
  currentStudentLoadError
})(StudentDetails);