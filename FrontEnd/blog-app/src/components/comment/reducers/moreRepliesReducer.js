export const initialState = {
    isHideReplies : true,
    replyList : [],
}

export const TOGGLE_MORE_REPLIES = 'TOGGLE_MORE_REPLIES';
export const ADD_REPLIES = 'ADD_REPLIES';

export const moreRepliesReducer = (state,action)=>{
    switch (action.type) {
        case TOGGLE_MORE_REPLIES : 
        return {
            ...state,
            isHideReplies : !state.isHideReplies
        }
        
        case ADD_REPLIES : 
            return{
                ...state,
                replyList : [...action.payload.data]
            }
    
        default:
            break;
    }
}