import React, { useReducer } from 'react'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import styled from "styled-components";
import {TOGGLE_MORE_REPLIES,initialState,moreRepliesReducer,ADD_REPLIES} from './reducers/moreRepliesReducer';
import {renderComments} from '../post/Post'
import CardContent from "@material-ui/core/CardContent";

const MoreRepliesContainer = styled.div`

`
const MoreRepliesDropDownIcon = styled.div`
    color:darkblue;
    cursor: pointer;
`;  

const getReplies = async (commentId,dispatch)=>{
    try{
        const response = await fetch(`/comment/replies?parentCommentId=${commentId}`);
        if(!(response.status >=200 && response.status<400))
            throw Error("failed to get replies ,try again");
        const data = await response.json();
        
        dispatch({
            type : ADD_REPLIES,
            payload : {
                data : data.data
            }
        })
    }
    catch(error){
        console.error(error);
    }
}

function MoreReplies({childrenCount,commentId}) {

    const [moreRepliesState,dispatch] = useReducer(moreRepliesReducer,initialState); 
    const { isHideReplies , replyList} = moreRepliesState;
    return (
        <MoreRepliesContainer>
            {  
                isHideReplies 
                ?
                <MoreRepliesDropDownIcon
                    onClick = {
                        ()=> {
                            dispatch({
                                type : TOGGLE_MORE_REPLIES
                            });
                            getReplies(commentId,dispatch);
                        }
                    }
                >
                    <ArrowDropDownIcon fontSize = "large"/> <b> View {childrenCount} replies</b> 
                </MoreRepliesDropDownIcon>
                :
                <MoreRepliesDropDownIcon
                    onClick = {()=> {
                        dispatch({
                            type : TOGGLE_MORE_REPLIES
                        });

                    }}
                >
                    <ArrowDropUpIcon fontSize = "large"/> <b> Hide replies</b> 
                </MoreRepliesDropDownIcon> 
            }

            {
                !isHideReplies &&  <CardContent style = {{borderLeft:"solid",paddingBottom:"0",marginTop:"1em"}}>{renderComments(replyList)}</CardContent>
            }
        </MoreRepliesContainer>
    )
}

export default MoreReplies
