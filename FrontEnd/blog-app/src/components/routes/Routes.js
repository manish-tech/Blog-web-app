import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Container from "../container/Container";
import { useSelector } from "react-redux";
import NotLogin from "../NotLogin";
import Compose from "../compose/Compose";
import Login from "../login/Login.controller";
import Register from "../register/Register.controller";
import Post from "../post/Post.controller";
import MoreSearchResults from "../moreSearchResults/MoreSearchResults";
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
        <Route path="/search" component={MoreSearchResults} />

        <Redirect from="/logout" to="/">
          {" "}
        </Redirect>
      </Switch>
    </div>
  );
}

export default Routes;
