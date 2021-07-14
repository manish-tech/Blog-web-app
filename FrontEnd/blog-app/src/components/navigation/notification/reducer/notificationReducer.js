export const initialState = {
    isNotification : false,
    listOfNotificaions : [],
    errorMessage: '',
    isLoading : false,
    notificationId : null
}

export const FOUND_DATA = 'FOUND_DATA';
export const TOGGLE_NOTIFICATION = 'TOGGLE_NOTIFICATION';
export const LOADING = 'LOADING';
export const ERROR = 'ERROR';
export const CLOSE_NOTIFICATIONS = 'CLOSE_NOTIFICATIONS';
export const MARK_READ = 'MARK_READ';
export const notificationReducer = (state,action)=>{
    switch (action.type) {
        case TOGGLE_NOTIFICATION:
            return {
                ...state,
                isNotification : !state.isNotification
            }
        case FOUND_DATA : return{
            ...state,
            errorMessage : '',
            isLoading : false,
            listOfNotificaions : [...action.payload.data]
        }
        case ERROR : return{
            ...state,
            listOfNotificaions :[],
            errorMessage : action.payload.errorMessage
        }
        case LOADING : return{
            ...state,
            isLoading : true
        }
        case CLOSE_NOTIFICATIONS : return{
            ...state,
            isNotification : state.isNotification ? false :true 
        }
        case MARK_READ : return{
            ...state,
            notificationId : action.payload.notificationId
        }
        default:
            return state;
    }
} 