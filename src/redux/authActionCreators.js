import jwtDecode from 'jwt-decode';
import * as actionTypes from './actionTypes';
import axios from 'axios';


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

const signup_success=()=>{
    return{
        type: actionTypes.SIGNUP_SUCCESS
    }
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
        })
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

          
            
        })
        .catch(err=>{
            console.log(err);
        })

       
}

export const logout_user = ()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationTime');

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
        }
    }
}