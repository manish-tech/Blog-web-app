export const initialState = {
    replyInputVissible : true,
    replyInput : "",
    childrenCount : 0,
    isError : false
}

export const TOGGLE_INPUT_VISSIBLE = 'TOGGLE_INPUT_VISSIBLE';
export const SET_REPLY_INPUT = 'SET_REPLY_INPUT';
export const RESET = 'RESET';
export const INCREMENT_CHILDREN_COUNT = 'INCREMENT_CHILDREN_COUNT';
export const ERROR = 'ERROR';
export const commentReducer = (state,action)=>{
    
    switch (action.type) {
        case TOGGLE_INPUT_VISSIBLE:
            return{
                ...state,
                replyInputVissible : !state.replyInputVissible
            }
            
        case SET_REPLY_INPUT :
            return{
                ...state,
                replyInput : action.payload.replyInput
            } 
        case INCREMENT_CHILDREN_COUNT :
            return{
                ...state,
                childrenCount : state.childrenCount + 1
            }
        case RESET : 
            return{
                ...initialState,
                childrenCount : state.childrenCount
            }    
        case  ERROR :
            return{
                ...state,
                isError : true
            }   
        default:
            return state;
    }

}