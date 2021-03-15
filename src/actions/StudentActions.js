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
