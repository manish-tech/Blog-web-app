import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import { setLogin } from "../Login/Login.action";
import { PageContext } from "../Pagination/PaginationContext";
import Burger from "./Burger";

const NavbarStyle = styled.nav`
  width: 90%;
  max-width: 100%;

  @media screen and (max-width: 900px) {
    position: absolute;
    z-index: 15;
    top: 0;
    right: 0;
    max-width: 40%;
    height: 100vh;
    background-color: #dee4de;
    opacity: 0.95;
    display: ${({ isSideNavOn }) => {
      return isSideNavOn ? "block" : "none";
    }};
  }
`;

const UnListStyle = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: flex-end;

  @media screen and (max-width: 900px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    height: 100%;
  }
`;

const ListStyle = styled.li`
  @media screen and (max-width: 900px) {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    &:hover {
      background-color: #edefee;
      color: black;
    }
  }
`;

export const LinkStyle = styled(Link)`
  font-family: "Ubuntu", sans-serif;
  text-decoration: none;
  color: black;
  padding: 0.7em;
  margin-right: 2em;
  font-size: 1.2rem;
  font-weight: bold;
  &:hover {
    background-color: #edefee;
    color: black;
  }

  border-radius: 47%;
  @media screen and (max-width: 900px) {
    border-radius: 3px;
    display: block;
    width: 80%;
    height: 80%;
    text-align: center;
    margin: 0;
  }
`;

function NavBar() {
  const [isSideNavOn, setSideNavOn] = useState(false);
  const dispatch = useDispatch();
  const login = useSelector((state) => {
    return {
      isLoggedIn: state.login.isLoggedIn,
      userName: state.login.userName,
    };
  });
  const { setPagenumber, setLeftDissabled } = useContext(PageContext);
  function handleLogout(e) {
    fetch("/logout", {
      method: "get",
      credentials: "same-origin",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status) {
          dispatch(setLogin({ isLoggedIn: false, userName: null }));
          alert("successfully logged out");
        } else {
          throw new Error("couldn't logout");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <Burger isSideNavOn={isSideNavOn} setSideNavOn={setSideNavOn} />
      <NavbarStyle
        isSideNavOn={isSideNavOn}
        onClick={() => {
          if (isSideNavOn) setSideNavOn(!isSideNavOn);
        }}
      >
        <UnListStyle>
          <ListStyle>
            <LinkStyle
              to="/"
              onClick={() => {
                setPagenumber(0);
                setLeftDissabled(true);
              }}
            >
              Home
            </LinkStyle>
          </ListStyle>
          <ListStyle>
            <LinkStyle to="/login">Login</LinkStyle>
          </ListStyle>
          <ListStyle>
            <LinkStyle to="/register">Register</LinkStyle>
          </ListStyle>
          {login.isLoggedIn && (
            <ListStyle>
              <LinkStyle to="/logout" style={{ textDecoration: "none" }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleLogout}
                >
                  logout
                </Button>
              </LinkStyle>
            </ListStyle>
          )}

          {login.isLoggedIn && (
            <ListStyle>
              <LinkStyle to="/">{login.userName}</LinkStyle>
            </ListStyle>
          )}
        </UnListStyle>
      </NavbarStyle>
    </>
  );
}

export default NavBar;
