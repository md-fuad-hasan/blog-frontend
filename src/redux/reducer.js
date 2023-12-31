import * as actionTypes from './actionTypes';

const INITIAL_STATE = {
    token : null,
    userId : null,
    username : null,
    signupSuccess : false,
    bio: '',
    fullname: '',
    profile_pic: null,
    blog_list: [],
    user_blog_list: [],
    blog_detail_data: null,
    delete_blog_msg: false,
    loginErr: null,
    signupErr: null,
}


export const reducer = (state=INITIAL_STATE, action)=>{
    switch(action.type){
        case actionTypes.SIGNUP_SUCCESS:
            return{
                ...state,
                signupSuccess : true,
                signupErr: null,
            }
        case actionTypes.SIGNUP_FINISHED:
            return{
                ...state,
                signupSuccess: false
            }

        case actionTypes.SIGNUP_ERROR:
            return{
                ...state,
                signupErr : action.payload
            }

        case actionTypes.LOGIN_SUCCESS:
            
            return{
                ...state,
                token: action.payload.token,
                userId: action.payload.userId,
                username: action.payload.username,
                loginErr: null,
                signupErr: null,
               
            }
        case actionTypes.LOGIN_ERROR:
            return{
                ...state,
                loginErr : action.payload.loginErr
            }
        case actionTypes.LOGOUT_SUCCESS:
            return{
                ...state,
                token: null,
                userId: null,
                username : null,
                bio: null,
                fullname: null,
                profile_pic: null,
                user_blog_list: [],
                blog_detail_data: null,
                delete_blog_msg: false,


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
                blog_list: action.payload,
                loginErr: null
            }
        case actionTypes.USER_BLOG_LIST:
            return{
                ...state,
                user_blog_list: action.payload
            }
        case actionTypes.BLOG_DETAIL:
            return{
                ...state,
                blog_detail_data: action.payload
            }
        case actionTypes.DELETE_BLOG:
            return{
                ...state,
                delete_blog_msg : true
            }
        case actionTypes.DELETE_BLOG_DONE:
            return{
                ...state,
                delete_blog_msg : false
            }

        default:
            return state
    }
}