import jwtDecode from 'jwt-decode';
import * as actionTypes from './actionTypes';
import axios from 'axios';

import { user_blog_list } from './actionCreators';



const profile_detail_store=(bio,fullname,profile_pic)=>{
    return{
        type:actionTypes.PROFILE_DETAIL,
        payload:{
            bio:bio,
            fullname: fullname,
            profile_pic: profile_pic,
        }
    }
}

export const profile_detail=(userId,token)=>dispatch=>{
    const url = `http://127.0.0.1:8000/api/account-detail/${userId}/`;
    const header = {
        headers:{
            "Authorization": `Bearer ${token}`
        }
    }
    axios.get(url,header)
        .then(res=>{
            const bio = res.data.bio;
            const fullname = res.data.fullname
            const profile_pic = res.data.profile_pic
            dispatch(profile_detail_store(bio,fullname,profile_pic));
        })
        .catch(err=>{
            dispatch(profile_detail_store(null,null,null));
        })
    
   
    
    
}





const store_locally = (token,username)=>{
    const token_decode = jwtDecode(token);
    const userId = token_decode.user_id;
    const expirationTime = new Date(token_decode.exp * 1000);

    localStorage.setItem('username',username);
    localStorage.setItem('token',token);
    localStorage.setItem('userId',userId);
    localStorage.setItem('expirationTime',expirationTime);

    return userId;

}


const signup_success=()=>{
    return{
        type: actionTypes.SIGNUP_SUCCESS
    }
}

export const signup_finished=()=>{
    return{
        type: actionTypes.SIGNUP_FINISHED
    }
}

export const signup_error = msg =>{
    return{
        type: actionTypes.SIGNUP_ERROR,
        payload: msg
    }
}

export const signup_user = (email,username,password) =>dispatch=>{
    const url = 'http://127.0.0.1:8000/api/signup/';
    const data = {
        email:email,
        username:username,
        password:password
    }
    const header = {
        headers : {
            "Content-Type" : "application/json"
        }
    }

    axios.post(url,data,header)
        .then(res=>{
            dispatch(signup_success());
            
        })
        .catch(err=>{
            console.log(err);
            if(err.message==="Request failed with status code 400"){
                dispatch(signup_error(err.response.data));
            }else{
                dispatch(signup_error("Something went wrong !"));
            }
        })
}



const login_success=(token, userId,username)=>{

    

    return {
        type: actionTypes.LOGIN_SUCCESS,
        payload: {
            token: token,
            userId: userId,
            username: username,
        }
    }
}

export const login_error=(data)=>{
    return{
        type: actionTypes.LOGIN_ERROR,
        payload: {
            loginErr : data,
        }
    }
}

export const login_user = (username,password) =>dispatch=> {

    const url = 'http://127.0.0.1:8000/api/login/';
    const data = {
        username:username,
        password:password
    }
    const header = {
        headers : {
            "Content-Type" : "application/json"
        }
    }

    axios.post(url,data,header)
        .then(res=>{
            const username = res.data.username;
            const token = res.data.access;
            const userId = store_locally(token,username);
            dispatch(login_success(token,userId,username));
            dispatch(profile_detail(userId,token));
            dispatch(user_blog_list(userId,token));
          
            
        })
        .catch(err=>{

            
            if(err.message === "Request failed with status code 400"){
                dispatch(login_error(err.response.data.non_field_errors[0]));
            }else{
                dispatch(login_error("Something went wrong!"));

            }
            
        })

       
}

export const logout_user = ()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('username');

    return{
        type: actionTypes.LOGOUT_SUCCESS
    }
}

export const auth_check =()=>dispatch=>{
    const token = localStorage.getItem('token');
    if(!token){
        dispatch(logout_user());
    }else{
        const username = localStorage.getItem('username');
        const userId = localStorage.getItem('userId');
        const expirationTime = new Date(localStorage.getItem('expirationTime'));

        if(expirationTime<=new Date()){
            dispatch(logout_user());
        }
        else{
            dispatch(login_success(token,userId,username));
            dispatch(profile_detail(userId,token));

        }
    }
}


export const profile_update= (userId,token,data)=>dispatch=>{
    const url = `http://127.0.0.1:8000/api/account-detail/${userId}/`;
    const header = {
        headers:{
            "Authorization": `Bearer ${token}`
        }
    }
    axios.patch(url,data,header)
        .then(res=>{
            // console.log(res);
        })
        .catch(err=>{
            console.log(err);
        })
    
}