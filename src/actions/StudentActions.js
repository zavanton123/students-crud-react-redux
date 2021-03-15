// this is a thunk
export const studentsLoad = (studentService) => async (dispatch) => {
  try {
    dispatch(studentsLoading());
    const students = await studentService.getStudents();
    dispatch(studentsLoaded(students));
  } catch (error) {
    dispatch(studentsLoadError());
  }
}

// this is also a thunk
export const studentDelete = (studentService, studentId) => async (dispatch) => {
  try {
    const response = await studentService.deleteStudent(studentId);
    if (response.status === 204) {
      dispatch(studentsLoad(studentService));
    }
  } catch (error) {
    dispatch(studentsLoadError());
  }
}

// one more thunk
export const currentStudentLoad = (studentService, studentId) => async (dispatch) => {
  dispatch(currentStudentLoading());
  try {
    const data = await studentService.getStudentById(studentId);
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
