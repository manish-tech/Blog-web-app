import { combineReducers } from "redux";
import loginReducer from "../components/login/Login.reducer";
// import mainListReducer from "../components/Main/Main.reducer";
const rootReducer = combineReducers({
  login: loginReducer,
});

export default rootReducer;
