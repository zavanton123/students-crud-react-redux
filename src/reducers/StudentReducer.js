const initialState = {
  currentStudent: null,
  students: [],
  error: false,
  loading: false
}

export const StudentReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'STUDENTS_LOADING':
      return {
        ...state,
        loading: true,
        error: false
      }

    case 'STUDENTS_LOADED':
      return {
        ...state,
        students: action.payload,
        loading: false,
        error: false
      };

    case  'STUDENTS_LOAD_ERROR':
      return {
        ...state,
        loading: false,
        error: true
      };

    case 'CURRENT_STUDENT_LOADING':
      return {
        ...state,
        currentStudent: null,
        loading: true,
        error: false
      };

    case 'CURRENT_STUDENT_LOADED':
      return {
        ...state,
        currentStudent: action.payload,
        loading: false,
        error: false
      };

    case 'CURRENT_STUDENT_LOAD_ERROR':
      return {
        ...state,
        currentStudent: null,
        loading: false,
        error: true
      };

    case 'ADD_STUDENT_IN_PROGRESS':
      return {
        ...state,
        loading: true,
        error: false
      }

    case 'ADD_STUDENT_ERROR':
      return {
        ...state,
        loading: false,
        error: true
      }

    case 'ADD_STUDENT_SUCCESS':
      return {
        ...state,
        loading: false,
        error: false
      };

    default:
      return state;
  }
};
