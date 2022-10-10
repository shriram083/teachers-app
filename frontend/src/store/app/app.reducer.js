import {
  ADD_NEW_TEST_LOADING,
  ADD_NEW_TEST_SUCCESS,
  GET_ALL_STUDENTS_FAILURE,
  GET_ALL_STUDENTS_LOADING,
  GET_ALL_STUDENTS_SUCCESS,
  GET_TESTS_FAILURE,
  GET_TESTS_LOADING,
  GET_TESTS_SUCCESS,
} from "./app.types";

const initialState = {
  data: [],
  isLoading: false,
  isError: false,
  addTest: {
    isLoading: false,
    isSuccess: false,
  },
  tests: {
    allTests: [],
    isLoading: false,
    isError: false,
  },
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_STUDENTS_LOADING: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case GET_ALL_STUDENTS_SUCCESS: {
      console.log(action.payload.sortBy);
      let arr = action.payload.res;

      if (action?.payload?.filterBy) {
        arr = arr.filter((el) => {
          return el.gender == action?.payload?.filterBy;
        });
      }
      if (action?.payload?.sortBy) {
        arr = arr.sort((a, b) => {
          if (action.payload.sortBy == "asc") {
            return a.age - b.age;
          } else {
            return b.age - a.age;
          }
        });
      }
      return {
        ...state,
        data: arr,
        isLoading: false,
      };
    }
    case GET_ALL_STUDENTS_FAILURE: {
      console.log("fail");
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    }
    case ADD_NEW_TEST_LOADING: {
      return {
        ...state,
        addTest: {
          isLoading: true,
          isSuccess: false,
        },
      };
    }
    case ADD_NEW_TEST_SUCCESS: {
      return {
        ...state,
        addTest: {
          isLoading: false,
          isSuccess: true,
        },
      };
    }
    case GET_TESTS_LOADING: {
      return {
        ...state,
        tests: {
          isLoading: true,
          allTests: [],
          isError: false,
        },
      };
    }
    case GET_TESTS_SUCCESS: {
      return {
        ...state,
        tests: {
          isLoading: false,
          allTests: action.payload,
          isError: false,
        },
      };
    }
    case GET_TESTS_FAILURE: {
      return {
        ...state,
        tests: {
          isLoading: false,
          allTests: [],
          isError: true,
        },
      };
    }
    default: {
      return { ...state };
    }
  }
};
