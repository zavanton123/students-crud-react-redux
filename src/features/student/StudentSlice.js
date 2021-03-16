import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {deleteStudent, getStudentById, getStudents} from "../../api/StudentService";

const initialState = {
  currentStudent: null,
  students: [],
  error: false,
  loading: false
}

// Create an asynchronous thunk
export const studentsLoad = createAsyncThunk('students/load', async () => {
  const students = await getStudents();
  return students;
});

// Create an asynchronous thunk
export const studentDelete = createAsyncThunk('student/delete', async studentId => {
  const response = await deleteStudent(studentId);
  if (response.status === 204) {
    return getStudents();
  } else {
    throw new Error("The status code is not 204")
  }
});

// Create an asynchronous thunk
export const currentStudentLoad = createAsyncThunk('currentStudent/load', async studentId => {
  const student = await getStudentById(studentId);
  return student
});

// Create a slice
export const studentSlice = createSlice({
  name: 'students',
  initialState: initialState,
  reducers: {
    studentsLoading(state, action) {
      state.loading = true;
      state.error = false;
    },
    studentsLoaded(state, action) {
      state.loading = false;
      state.error = false;
      state.students = action.payload
    },
    studentsLoadError(state, action) {
      state.loading = false;
      state.error = true;
    },
    currentStudentLoading(state, action) {
      state.currentStudent = null;
      state.loading = true;
      state.error = false;
    },
    currentStudentLoaded(state, action) {
      state.currentStudent = action.payload;
      state.loading = false;
      state.error = false;
    },
    currentStudentLoadError(state, action) {
      state.currentStudent = null;
      state.loading = false;
      state.error = true;
    }
  },
  extraReducers: {
    [studentsLoad.pending]: (state, action) => {
      state.loading = true;
      state.error = false;
    },
    [studentsLoad.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = false;
      state.students = action.payload
    },
    [studentsLoad.rejected]: (state, action) => {
      state.loading = false;
      state.error = true;
    },
    [studentDelete.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = false;
      state.students = action.payload
    },
    [currentStudentLoad.pending]: (state, action) => {
      state.loading = true;
      state.error = false;
      state.currentStudent = null;
    },
    [currentStudentLoad.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = false;
      state.currentStudent = action.payload;
    },
    [currentStudentLoad.rejected]: (state, action) => {
      state.loading = false;
      state.error = true;
      state.currentStudent = null;
    },
  }
});

// export reducer
export const studentReducer = studentSlice.reducer;

// export actions
export const {
  studentsLoading, studentsLoaded, studentsLoadError,
  currentStudentLoading, currentStudentLoaded, currentStudentLoadError
} = studentSlice.actions;

// export selectors (i.e. parts of slice state)
export const getLoadingSelector = (state) => state.students.loading;
export const getErrorSelector = (state) => state.students.error;
export const getCurrentStudentSelector = (state) => state.students.currentStudent;
export const getStudentsSelector = (state) => state.students.students;