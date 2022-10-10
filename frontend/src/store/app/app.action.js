import {
  ADD_NEW_TEST_LOADING,
  ADD_NEW_TEST_SUCCESS,
  DELETE_ONE_TEST_LOADING,
  EDIT_ONE_TEST_LOADING,
  GET_ALL_STUDENTS_FAILURE,
  GET_ALL_STUDENTS_LOADING,
  GET_ALL_STUDENTS_SUCCESS,
  GET_TESTS_FAILURE,
  GET_TESTS_LOADING,
  GET_TESTS_SUCCESS,
} from "./app.types";
let { token } = JSON.parse(localStorage.getItem("token")) || "";

export const getAllStudents = (payload) => (dispatch) => {
  dispatch({ type: GET_ALL_STUDENTS_LOADING });
  let url = `https://mock-12-backend.herokuapp.com/students`;
  let myHeaders = new Headers();
  myHeaders.append("Authorization", token);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(url, requestOptions)
    .then((res) => res.json())
    .then((res) => {
      dispatch({
        type: GET_ALL_STUDENTS_SUCCESS,
        payload: { ...payload, res },
      });
    })
    .catch((error) => {
      dispatch({ type: GET_ALL_STUDENTS_FAILURE });
    });
};

export const addStudent = (payload) => (dispatch) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", token);
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify(payload);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  return fetch(
    "https://mock-12-backend.herokuapp.com/students/create",
    requestOptions
  )
    .then((response) => response.text())
    .then((res) => {
      dispatch({ type: ADD_NEW_TEST_SUCCESS });
      return res;
    })
    .catch((error) => {
      return "something went wrong";
    });
};

export const addNewTest = (payload) => (dispatch) => {
  dispatch({ type: ADD_NEW_TEST_LOADING });

  var myHeaders = new Headers();
  myHeaders.append("Authorization", token);
  myHeaders.append("Content-Type", "application/json");
  const { testName, subject, marks, testDate, id } = payload;
  var raw = JSON.stringify({
    name: testName,
    subject,
    marks,
    date: testDate,
    student_id: id,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  return fetch(
    `https://mock-12-backend.herokuapp.com/tests/create/${id}`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      return result;
    })
    .catch((error) => {
      return error;
    });
};

export const getAllTests =
  ({ id }) =>
  (dispatch) => {
    dispatch({ type: GET_TESTS_LOADING });

    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`https://mock-12-backend.herokuapp.com/tests/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        dispatch({ type: GET_TESTS_SUCCESS, payload: result });
      })
      .catch((error) => {
        dispatch({ type: GET_TESTS_FAILURE });
      });
  };

export const editOneTest = (payload) => (dispatch) => {
  dispatch({ type: EDIT_ONE_TEST_LOADING });

  var myHeaders = new Headers();
  myHeaders.append("Authorization", token);
  myHeaders.append("Content-Type", "application/json");
  const { testName, subject, marks, testDate, id } = payload;

  var raw = JSON.stringify({
    name: testName,
    subject,
    marks,
    date: testDate,
  });

  var requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  return fetch(
    `https://mock-12-backend.herokuapp.com/tests/single/${id}`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      return result;
    })
    .catch((error) => {
      return error;
    });
};

export const deleteOneTest = (payload) => (dispatch) => {
  dispatch({ type: DELETE_ONE_TEST_LOADING });

  var myHeaders = new Headers();
  myHeaders.append("Authorization", token);

  var requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow",
  };

  return fetch(
    `https://mock-12-backend.herokuapp.com/tests/single/${payload.id}`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      return result;
    })
    .catch((error) => {
      return error;
    });
};
