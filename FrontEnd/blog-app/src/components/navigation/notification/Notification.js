import React, { useEffect, useReducer, useRef } from "react";
import NotificationsIcon from "@material-ui/icons/Notifications";
import IconButton from "@material-ui/core/IconButton";
import styled from "styled-components";
import NotificationList from "./NotificationList";
import Badge from "@material-ui/core/Badge";
import { withStyles } from "@material-ui/core/styles";
import {getNotificationsData} from './NotificationList';
import { useSelector } from "react-redux";
import {
  CLOSE_NOTIFICATIONS,
  initialState,
  notificationReducer,
  TOGGLE_NOTIFICATION,
} from "./reducer/notificationReducer";

const NotificationContainer = styled.div``;

const NotificationListContainer = styled.div`
  position: relative;
  display: flex;
`;

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}))(Badge);

function Notification() {
  const [notificationState, dispatch] = useReducer(
    notificationReducer,
    initialState
  );
  const {isLoggedIn} = useSelector((state) => {
    return {
      isLoggedIn: state.login.isLoggedIn,
      userName: state.login.userName,
      url : state.login.url
    };
  });  
  const { isNotification, listOfNotificaions } = notificationState;

  const handleToggleNotification = (event) => {
    dispatch({
      type: TOGGLE_NOTIFICATION,
    });
    event.stopPropagation();
  };

  useEffect(()=>{
      if(isLoggedIn)
        getNotificationsData(dispatch);
  },[isLoggedIn])

  return (
    <NotificationContainer>
      <IconButton
        onClick={(e) => handleToggleNotification(e)}
        variant="contained"
        size="medium"
      >
        <StyledBadge badgeContent={listOfNotificaions.length} color="secondary">
          <NotificationsIcon />
        </StyledBadge>
      </IconButton>
      <NotificationListContainer>
        {isNotification ? (
          <NotificationList
            handleToggleNotification={handleToggleNotification}
            listOfNotificaions={listOfNotificaions}
            dispatch={dispatch}
            notificationState={notificationState}
          />
        ) : null}
      </NotificationListContainer>
    </NotificationContainer>
  );
}

export default Notification;
