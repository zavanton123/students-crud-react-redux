import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {deleteStudent, getStudentById, getStudents} from "../../api/StudentService";

// Entity adapter is used for normalising state
// the empty state is {
//     id: [],
//     entitites: {}
// }
const adapter = createEntityAdapter();

// we get the initial state from adapter
const initialState = adapter.getInitialState({
  currentStudent: null,
  error: false,
  loading: false
});

// Create an asynchronous thunk
export const studentsLoad = createAsyncThunk('students/load', async () => {
  const students = await getStudents();
  return students;
});

// Create an asynchronous thunk
export const studentDelete = createAsyncThunk('student/delete', async studentId => {
  const response = await deleteStudent(studentId);
  if (response.status === 204) {
    return studentId;
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
  reducers: {},
  extraReducers: {
    [studentsLoad.pending]: (state, action) => {
      state.loading = true;
      state.error = false;
    },
    [studentsLoad.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = false;

      // the state is updated via adapter
      adapter.upsertMany(state, action.payload);
    },
    [studentsLoad.rejected]: (state, action) => {
      state.loading = false;
      state.error = true;
    },
    [studentDelete.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = false;

      // the state is updated via adapter
      adapter.removeOne(state, action.payload);
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

// export selectors (i.e. parts of slice state)
// we get some of the selectors from adapter
export const {selectAll: getStudentsSelector} = adapter.getSelectors(state => state.students);
export const getLoadingSelector = (state) => state.students.loading;
export const getErrorSelector = (state) => state.students.error;
export const getCurrentStudentSelector = (state) => state.students.currentStudent;
