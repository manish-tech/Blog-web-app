import React, { useReducer } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import styled from "styled-components";
import Button from '@material-ui/core/Button';
import {initialState,commentReducer,TOGGLE_INPUT_VISSIBLE,SET_REPLY_INPUT, RESET,INCREMENT_CHILDREN_COUNT, ERROR} from './reducers/commentReducer';
import TextField from "@material-ui/core/TextField";
import getTimeToAgo from '../../helper/getTimeToAgo';
import MoreReplies from "./MoreReplies";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Avatar from '@material-ui/core/Avatar';
const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export const CardWraper = styled.div`
  border-width: 3px;
  border-style: solid;
  border-color: #f5f2f2;
  margin-bottom: 2em;
`;

const Container = styled.div`

`;
const Detail = styled.div`
  margin-bottom: 1em;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const UserName = styled.b`
  min-width:0;
  margin-left: 0.5em;
`;


const DateComment = styled.b`
  margin-left: 0.5em;
  
`;

const Content = styled.p`
  white-space: pre;
  margin-bottom: 1em;
  min-width:0;
`;

const ReplyButton = styled.div`
  
`;
const ReplyInputBox = styled.div`

`;

const SubmitReplyButton = styled.div`

`;


const handleSubmitReply = async ({
  commentId,
  currentUser,
  postId,
  replyInput,
  dispatch
})=>{
  try{
    const response = await fetch('/comment/submitReply',  {method: "POST",
                            body: JSON.stringify({
                              postId: postId,
                              userName: currentUser,
                              content: replyInput.trim(),
                              parentCommentId :commentId
                            }),
                            headers: {
                              "Content-Type": "application/json",
                            },
                            credentials: "same-origin",
                          });
    if(!(response.status >=200 && response.status < 400))
        throw Error("failed to reply");
    const data = await response.json();
    dispatch({
      type : INCREMENT_CHILDREN_COUNT
    })
    dispatch({
      type: RESET
    })
  }
  catch(error){
    console.log(error);
    dispatch({
      type:ERROR
    })
  }
}


export default function Comment({comment}) {
  const classes = useStyles();
  const {user_name : userName , date_of_comment : dateOfComment ,content,children_count : childrenCount,comment_id : commentId ,url} = comment;
  const [commentState,dispatch] = useReducer(commentReducer,{
    ...initialState,
    childrenCount
  });
  const {replyInputVissible,replyInput,childrenCount : repliesCount,isError} = commentState;
  
  const { postId } = useParams();
  const {userName : currentUser} = useSelector((state) => {
    return {
      isLoggedIn: state.login.isLoggedIn,
      userName: state.login.userName,
    };
  });

 
  return (
    <CardWraper>
      <Card className={classes.root}>
        <CardContent>
          <Container>
            <Detail variant="body2" component="bold">
              <Avatar src = {url}/>
              <UserName>{userName} </UserName>
              <DateComment>{getTimeToAgo(dateOfComment)}</DateComment>
            </Detail>
            <Content variant="body2" component="p">
              {content}
            </Content>
            {
              replyInputVissible ?  
              <ReplyButton>
                <Button 
                variant="contained" 
                color="primary"
                onClick = {()=> dispatch({
                  type:TOGGLE_INPUT_VISSIBLE
                })}
                >reply
                </Button>
              </ReplyButton>
              :
              <ReplyInputBox>
                <TextField
                  style={{ margin: 8 ,marginLeft:"0"}}
                  placeholder="add a reply"
                  fullWidth
                  value={replyInput}
                  onChange={(e)=> dispatch({
                    type: SET_REPLY_INPUT,
                    payload : {
                    replyInput : e.target.value 
                   }
                  })}
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <SubmitReplyButton>
                  <Button 
                 variant="contained" 
                 onClick = {()=>dispatch({
                   type:RESET
                 })} 
                 >cancel</Button>
                  <Button 
                    onClick = {()=> handleSubmitReply({
                      commentId,
                      currentUser,
                      postId,
                      replyInput,
                      dispatch
                    })}
                    style = {{marginLeft:"0.8em"}}
                    variant="contained" 
                    color="primary">
                    reply
                  </Button>
                </SubmitReplyButton>
                {isError ?
                <div style = {{color: 'red',padding: '0.5em' }}>We weren't able to add your reply. Please try again.</div>
                  : null
                }
              </ReplyInputBox>
            }
            
              {
                repliesCount > 0 ? 
                  <MoreReplies
                    childrenCount = {repliesCount}
                    commentId = {commentId}
                  />
                : null 
              }
          </Container>
        </CardContent>
      </Card>
    </CardWraper>
  );
}
