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

export const addStudentInProgress = () => ({
  type: 'ADD_STUDENT_IN_PROGRESS'
})

export const addStudentSuccess = () => ({
  type: 'ADD_STUDENT_SUCCESS'
})

export const addStudentError = () => ({
  type: 'ADD_STUDENT_ERROR'
})



