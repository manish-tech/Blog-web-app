import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Container from "../Container/Container";
import { useSelector } from "react-redux";
import NotLogin from "../NotLogin";
import Compose from "../Compose/Compose";
import Login from "../Login/Login.controller";
import Register from "../Register/Register.controller";
import Post from "../Post/Post.controller";
function Routes() {
  const login = useSelector((state) => {
    return {
      isLoggedIn: state.login.isLoggedIn,
      userName: state.login.userName,
    };
  });
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Container} />
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register" component={Register} />
        <Route path="/compose">
          {/* {login.isLoggedIn ? <Compose /> : <NotLogin />} */}
          <Compose />
        </Route>
        <Route path="/category/:category" component={Container} />
        <Route path="/post/:postId" component={Post} />
        <Redirect from="/logout" to="/">
          {" "}
        </Redirect>
      </Switch>
    </div>
  );
}

export default Routes;
