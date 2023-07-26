import axios from "axios";
import * as actionTypes from './actionTypes';


const all_blog = (data)=>{
    return{
        type: actionTypes.BLOG_LIST,
        payload: data
    }
}

export const blog_list= ()=>dispatch=>{
    const url = 'http://127.0.0.1:8000/api/blog/'
    axios.get(url)
        .then(res=>{
            dispatch(all_blog(res.data));
        })
        .catch(err=>{
            console.log(err);
        })
}

const user_blog=(data)=>{
    return{
        type: actionTypes.USER_BLOG_LIST,
        payload: data
    }
}

export const user_blog_list=(userId,token)=>dispatch=>{
    const url = `http://127.0.0.1:8000/api/blog/user/?user=${userId}`;
    const header = {
        headers:{
            "Authorization": `Bearer ${token}`
        }
    }
    axios.get(url,header)
        .then(res=>{
            
            dispatch(user_blog(res.data));
        })
        .catch(err=>{
            console.log(err);
        })
}