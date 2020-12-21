import {combineReducers}from "redux";
import loginReducer from "../components/Login/Login.reducer"
// import mainListReducer from "../components/Main/Main.reducer";
const rootReducer = combineReducers({
    login : loginReducer,
    // mainList : mainListReducer
})

export default rootReducer;