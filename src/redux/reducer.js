import * as actionTypes from './actionTypes';

const INITIAL_STATE = {
    token : null,
    userId : null,
    username : null,
    signupSuccess : false,
    bio: null,
    fullname: null,
    profile_pic: null,
    blog_list: [],
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
                username : null,
                bio: null,
                fullname: null,
                profile_pic: null
            }
        
        case actionTypes.PROFILE_DETAIL:
            return{
                ...state,
                bio: action.payload.bio,
                fullname: action.payload.fullname,
                profile_pic: action.payload.profile_pic,
            }

        case actionTypes.BLOG_LIST:
            return{
                ...state,
                blog_list: action.payload
            }
       
        default:
            return state
    }
}