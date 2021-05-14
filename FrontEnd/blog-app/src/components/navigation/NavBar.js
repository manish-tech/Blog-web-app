import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import { setLogin } from "../Login/Login.action";
import { PageContext } from "../Pagination/PaginationContext";
import Burger from "./Burger";

const NavbarStyle = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const MainNavbarStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SideNavbarStyle = styled.div`
  width: fit-content;
  @media screen and (max-width: 900px) {
    position: absolute;
    z-index: 15;
    top: 0;
    right: 0;
    width: 40%;
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

const ProfileStyle = styled(ListStyle)`
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  a {
    width: 100%;
    background-color: #6b6969;
    border-radius: 5px;
    color: white;
  }
`;

export const LinkStyle = styled(Link)`
  font-family: "Ubuntu", sans-serif;
  text-decoration: none;
  text-align: center;
  color: ${({ loginLink }) => (loginLink ? "white;" : "black")};
  background-color: ${({ loginLink }) =>
    loginLink ? "rgb(118 75 188);" : "inherit"};
  padding: 0.7em;
  margin-right: 2em;
  font-size: 1rem;
  font-weight: bold;
  &:hover {
    background-color: #edefee;
    color: black;
  }

  border-radius: 5px;
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
      <NavbarStyle>
        <MainNavbarStyle>
          {login.isLoggedIn && (
            <ProfileStyle>
              <LinkStyle to="/">{login.userName}manish</LinkStyle>
            </ProfileStyle>
          )}
          <Burger isSideNavOn={isSideNavOn} setSideNavOn={setSideNavOn} />
        </MainNavbarStyle>
        <SideNavbarStyle
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
            {!login.isLoggedIn && (
              <>
                <ListStyle>
                  <LinkStyle loginLink={true} to="/login">
                    Login
                  </LinkStyle>
                </ListStyle>
                <ListStyle>
                  <LinkStyle to="/register">Register</LinkStyle>
                </ListStyle>
              </>
            )}
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
          </UnListStyle>
        </SideNavbarStyle>
      </NavbarStyle>
    </>
  );
}

export default NavBar;
