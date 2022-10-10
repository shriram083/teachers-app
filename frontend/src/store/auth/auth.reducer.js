import {
  URSER_LOGIN_FAILURE,
  URSER_LOGIN_LOADING,
  URSER_LOGIN_SUCCESS,
  USER_LOGOUT,
} from "./auth.types";

let token = JSON.parse(localStorage.getItem("token")) || "";
const initialState = {
  data: {
    isAuth: token ? true : false,
    token: token ? token.token : "",
    user: token ? token.name : "",
  },
  isLoading: false,
  isError: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case URSER_LOGIN_LOADING:
      return {
        ...state,
        isLoading: true,
      };

    case URSER_LOGIN_SUCCESS:
      localStorage.setItem(
        "token",
        JSON.stringify({
          token: action.payload.token,
          name: action.payload.name,
        })
      );
      return {
        ...state,
        data: {
          isAuth: true,
          token: action.payload.token,
          user: action.payload.name,
        },
        isLoading: false,
      };

    case URSER_LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    case USER_LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        data: {
          isAuth: false,
          token: "",
          user: "",
        },
        isLoading: false,
      };

    default: {
      return {
        ...state,
      };
    }
  }
};
