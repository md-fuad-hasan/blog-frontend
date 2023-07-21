import * as actionTypes from './actionTypes';

const INITIAL_STATE = {
    token : null,
    userId : null,
    username : null,
    signupSuccess : false,
  
}


export const reducer = (state=INITIAL_STATE, action)=>{
    switch(action.type){
        case actionTypes.SIGNUP_SUCCESS:
            return{
                ...state,
                signupSuccess : true
            }
        case actionTypes.LOGIN_SUCCESS:
            return{
                ...state,
                token: action.payload.token,
                userId: action.payload.userId,
                username: action.payload.username,
            }
        case actionTypes.LOGOUT_SUCCESS:
            return{
                ...state,
                token: null,
                userId: null,
            }
       
        default:
            return state
    }
}