import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import styled from "styled-components";
import useOutsideClick from "../../../hooks/useOutsideClick";
import CircularProgress from "@material-ui/core/CircularProgress";
import { FOUND_DATA, LOADING, ERROR ,MARK_READ} from "./reducer/notificationReducer";
import { Link } from "react-router-dom";
import Badge from "@material-ui/core/Badge";
import Avatar from "@material-ui/core/Avatar";
import { useSelector } from "react-redux";
const StyledNotificationList = styled.div`
  position: absolute;
  top: 0;
  right: 60%;
  max-height: 70vh;
  width: 50vmin;
  background-color: white;
  overflow-y: auto;
`;

const Header = styled.div`
  font-size: 1rem;
  font-weight: bold;
  width: 100%;
  padding: 1em;
  background-color: darkgray;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const List = styled.div`
  margin-bottom: 0.4em;
  padding: 1em;
  max-width: 40%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 900px) {
      flex-wrap: wrap;
      justify-content:center;
      align-self: center;
  }
  
`;
const Content = styled.div`
  margin-bottom: 0.4em;
  padding: 1em;
  width: 60%;
  font-weight: bold;
`;
const Error = styled.div`
  padding: 1em;
`;

const Loading = styled.div`
  padding: 1em;
`;
const NoResultsFound = styled.div`
    padding: 1em;
`;
const LinkStyle = styled(Link)`
  text-decoration: none;
  color: black;
  margin: 0;
  padding: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #dbdbdd;
  &:hover {
    background-color: #efeff1;
    cursor: pointer;
  }
`;

export const getNotificationsData = async (dispatch) => {
  try {
    dispatch({
      type: LOADING,
    });
    const response = await fetch(`/notification/getNotifications`);
    if (!(response.status >= 200 && response.status < 400)) {
      dispatch({
        type: ERROR,
        payload: {
          errorMessage: "please login or something went wrong!",
        },
      });
      return;
    }
    const data = await response.json();
    dispatch({
      type: FOUND_DATA,
      payload: {
        data: data.data,
      },
    });
  } catch (e) {
    dispatch({
      type: ERROR,
      payload: {
        errorMessage: "something went wrong!",
      },
    });
    console.error(e);
  }
};

async function handleRead(e,dispatch){
    const notificationId = e.target.dataset.notificationid;
    try{
        const  response = await fetch('/notification/markRead',{
            method:'PATCH',
            headers: {
                "Content-Type": "application/json",
            },
            body : JSON.stringify({
                notificationId : notificationId
            })
        })

        if(response.ok){
            dispatch({
                type :MARK_READ,
                payload : {
                    notificationId : notificationId
                }
            });
        }

    }
    catch(error){
        console.log(error);
    }

}

const markRead = (data,notificationId)=>{
    notificationId = Number(notificationId);
    if(data.notification_id=== notificationId){
        return true;
    }
    if(!data.is_read){
        return false;
    }

}

const renderList = ({ listOfNotificaions, isLoading, errorMessage,isLoggedIn ,notificationId}) => {

  if (errorMessage || (!isLoggedIn)) return <Error> {errorMessage || "please login in"} </Error>;
  else if (isLoading) {
    return (
      <Loading>
        <CircularProgress />{" "}
      </Loading>
    );
  } else if (Array.isArray(listOfNotificaions)) {
    if (listOfNotificaions.length === 0)
      return <NoResultsFound>No notifications </NoResultsFound>;
    else {
      return listOfNotificaions.map((data) => {
        return (
          <LinkStyle 
          key={data.notification_id} 
          to={`/post/${data.post_id}`}
          data-notificationid = {data.notification_id}
          >
            <List
             data-notificationid = {data.notification_id}
             >
                <Badge color="primary" variant="dot" invisible={ markRead(data,notificationId)} />
                <Avatar
                    data-notificationid = {data.notification_id}
                 />             
                <b 
                    data-notificationid = {data.notification_id}
                style={{marginLeft:'0.7em'}}>{data.from_username}</b>
            </List>
            <Content
                data-notificationid = {data.notification_id}
            >{data.message}</Content>
          </LinkStyle>
        );
      });
    }
  }
};

function NotificationList({
  handleToggleNotification,
  listOfNotificaions,
  dispatch,
  notificationState,
}) {
    const {isLoggedIn} = useSelector((state) => {
        return {
          isLoggedIn: state.login.isLoggedIn,
          userName: state.login.userName,
          url : state.login.url
        };
      });  
  const ref = useRef(null);
  const { errorMessage, isLoading ,notificationId} = notificationState;
  useOutsideClick(handleToggleNotification, ref);
  useEffect(() => {
    getNotificationsData(dispatch);
  }, []);

  return (
    <StyledNotificationList 
        ref={ref}
        onClick = {(e)=>handleRead(e,dispatch)}
    >
      <Header>Notifications</Header>
      <Container>
        {renderList({ listOfNotificaions, isLoading, dispatch, errorMessage ,isLoggedIn,notificationId})}
      </Container>
    </StyledNotificationList>
  );
}

export default NotificationList;
