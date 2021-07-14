import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import { setLogin } from "../login/Login.action";
import { PageContext } from "../pagination/PaginationContext";
import Burger from "./Burger";
import Search from "./search/Search";
import Notification from "./notification/Notification";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { makeStyles } from "@material-ui/core/styles";
import { useMediaQuery } from "react-responsive";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

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
    width: 50%;
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  @media screen and (max-width: 900px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    &:hover {
      background-color: #edefee;
      color: black;
    }
  }
`;

export const LinkStyle = styled(Link)`
  font-family: "Ubuntu", sans-serif;
  text-decoration: none;
  color: ${({ loginlink }) => (loginlink ? "white;" : "black")};
  background-color: ${({ loginlink }) =>
    loginlink ? "rgb(118 75 188);" : "inherit"};
  padding: 0.7em;
  font-size: 1rem;
  font-weight: bold;
  &:hover {
    background-color: ${({ loginlink }) =>
      loginlink ? "rgb(118 75 188);" : "#edefee"};
    color: black;
  }

  border-radius: 5px;
  @media screen and (max-width: 900px) {
    border-radius: 3px;
    display: block;
    text-align: center;
    margin: 0;
  }
`;

const MainNavbarBoxes = styled.div`
  margin-right: 1em;
`;
function NavBar() {
  const classes = useStyles();
  const [isSideNavOn, setSideNavOn] = useState(false);
  const [toggleSearch, setToggleSearch] = useState(false);

  const dispatch = useDispatch();
  const isPhone = useMediaQuery({ query: "(max-width: 450px)" });
  const login = useSelector((state) => {
    return {
      isLoggedIn: state.login.isLoggedIn,
      userName: state.login.userName,
      url: state.login.url,
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
          <MainNavbarBoxes>
            {!isPhone ? (
              <Search />
            ) : (
              <>
                <IconButton
                  onClick={() => setToggleSearch(!toggleSearch)}
                  size="medium"
                >
                  <SearchIcon />
                </IconButton>
                {toggleSearch && <Search />}
              </>
            )}
          </MainNavbarBoxes>
          <MainNavbarBoxes>
            <Notification />
          </MainNavbarBoxes>

          {login.isLoggedIn && (
            <MainNavbarBoxes>
              <Link to="/">
                <Avatar
                  className={classes.small}
                  style={{ margin: "0" }}
                  src={login.url}
                />
              </Link>
            </MainNavbarBoxes>
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
                  <LinkStyle loginlink="true" to="/login">
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
                <LinkStyle
                  onClick={handleLogout}
                  to="/logout"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ExitToAppIcon />
                  <span>logout</span>
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
