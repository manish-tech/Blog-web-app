import React from "react";
import Header from "./components/Header/Header"
import {BrowserRouter ,Switch , Route , Redirect} from "react-router-dom";
import Container from "./components/Container/Container"
import styled from "styled-components";



function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Header/>
    <Switch >
      <Route exact path = "/"> <Container/> </Route>
      <Route path = "/about"/> 
      <Route path = "/login" />
      <Route path = "/register"/>
      <Redirect from = "/logout" to = "/"></Redirect> 
    </Switch>
      
    </BrowserRouter>
    
    </div>
  );
}

export default App;
