import {
  URSER_LOGIN_FAILURE,
  URSER_LOGIN_LOADING,
  URSER_LOGIN_SUCCESS,
  USER_LOGOUT,
} from "./auth.types";

export const userLogin = (payload) => (dispatch) => {
  dispatch({ type: URSER_LOGIN_LOADING });

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    email: payload.email,
    password: payload.password,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  return fetch(
    "https://mock-12-backend.herokuapp.com/user/login",
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => dispatch({ type: URSER_LOGIN_SUCCESS, payload: result }))
    .catch((error) => {
      dispatch({ type: URSER_LOGIN_FAILURE });
    });
};

export const userLogout = () => (dispatch) => {
  dispatch({ type: USER_LOGOUT });
};
