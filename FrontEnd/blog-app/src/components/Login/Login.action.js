import { SET_LOGIN, GET_LOGIN } from "./Login.types";

export const isLoggedIn = () => {
  return (dispatch) => {
    fetch("/isAuthenticated", {
      method: "GET",
      credentials: "same-origin",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status) {
          dispatch(
            setLogin({ isLoggedIn: data.status, userName: data.data.userName })
          );
        } else throw new Error("status false");
      })
      .catch((err) => {
        dispatch(setLogin({ isLoggedIn: false, userName: null }));
      });
  };
};

export const authenticate = (data, pathName) => {
  return (dispatch) => {
    fetch(pathName, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "same-origin",
      body: JSON.stringify(data),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status) {
          dispatch(setLogin({ isLoggedIn: data.status, userName: data.data }));
          alert("success...");
        } else throw new Error("status false");
      })
      .catch((err) => {
        dispatch(setLogin({ isLoggedIn: false, userName: null }));
        alert("failed...");
      });
  };
};

export const setLogin = (payload) => {
  return {
    type: SET_LOGIN,
    payload: payload
  };
};

export const getLogin = () => {
  return {
    type: GET_LOGIN
  };
};
