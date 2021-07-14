import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./rootReducer";
import ReduxThunk from "redux-thunk";

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(ReduxThunk)
  )
);
export default store;
