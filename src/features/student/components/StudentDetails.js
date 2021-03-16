import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import {currentStudentLoad, getCurrentStudentSelector, getErrorSelector, getLoadingSelector} from "../StudentSlice";

export const StudentDetails = () => {
  const dispatch = useDispatch();

  const currentStudent = useSelector(getCurrentStudentSelector);
  const loading = useSelector(getLoadingSelector);
  const error = useSelector(getErrorSelector);

  // get studentId from url path
  const {studentId} = useParams();

  useEffect(() => {
    dispatch(currentStudentLoad(studentId));
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
