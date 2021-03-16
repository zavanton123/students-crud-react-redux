// this is a thunk
import {deleteStudent, getStudentById, getStudents} from "../api/StudentService";

export const studentsLoad = () => async (dispatch) => {
  try {
    dispatch(studentsLoading());
    const students = await getStudents();
    dispatch(studentsLoaded(students));
  } catch (error) {
    dispatch(studentsLoadError());
  }
}

// this is also a thunk
export const studentDelete = (studentId) => async (dispatch) => {
  try {
    const response = await deleteStudent(studentId);
    if (response.status === 204) {
      dispatch(studentsLoad());
    }
  } catch (error) {
    dispatch(studentsLoadError());
  }
}

// one more thunk
export const currentStudentLoad = (studentId) => async (dispatch) => {
  dispatch(currentStudentLoading());
  try {
    const data = await getStudentById(studentId);
    dispatch(currentStudentLoaded(data));
  } catch (error) {
    dispatch(currentStudentLoadError());
  }
}


// these are action creators
export const studentsLoading = () => ({
  type: 'STUDENTS_LOADING'
})

export const studentsLoaded = (students) => ({
  type: 'STUDENTS_LOADED',
  payload: students
})

export const studentsLoadError = () => ({
  type: 'STUDENTS_LOAD_ERROR'
})

export const currentStudentLoading = () => ({
  type: 'CURRENT_STUDENT_LOADING'
})

export const currentStudentLoaded = (student) => ({
  type: 'CURRENT_STUDENT_LOADED',
  payload: student
})

export const currentStudentLoadError = () => ({
  type: 'CURRENT_STUDENT_LOAD_ERROR',
})
