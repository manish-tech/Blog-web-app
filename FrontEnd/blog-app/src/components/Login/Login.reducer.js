import loginInitialState from "./Login.initialState";
import { SET_LOGIN, GET_LOGIN } from "./Login.types";

const loginReducer = (state = loginInitialState, action) => {
  switch (action.type) {
    case SET_LOGIN:
      return {
        ...state,
        isLoggedIn: action.payload.isLoggedIn,
        userName: action.payload.userName,
      };
    case GET_LOGIN:
      return state;

    default:
      return state;
  }
};

export default loginReducer;
