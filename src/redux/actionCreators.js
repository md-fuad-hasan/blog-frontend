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

const blog_detail_show = (data)=>{
    return{
        type: actionTypes.BLOG_DETAIL,
        payload: data
    }
}

export const blog_detail = (slug,token) =>dispatch=>{
    const url = `http://127.0.0.1:8000/api/blog/blog-detail/${slug}`;
    const header = {
        headers:{
            "Authorization": `Bearer ${token}`
        }
    }

    axios.get(url,header)
        .then(res=>{
            dispatch(blog_detail_show(res.data));
        })
        .catch(err=>{
            console.log(err);
        })
}

const delete_blog =()=>{
    return{
        type: actionTypes.DELETE_BLOG,
    }
}

export const delete_blog_done =()=>{
    return{
        type: actionTypes.DELETE_BLOG_DONE,
    }
}


export const delete_post = (slug,token) =>dispatch=>{
    const url = `http://127.0.0.1:8000/api/blog/blog-detail/${slug}`
        const header = {
            headers:{
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`
            }
        }

        axios.delete(url,header)
            .then(res=>{
                dispatch(delete_blog());
                console.log(res);
            })
            .catch(err=>{
                console.log(err);
            })
}



export const update_post = (slug,token,data) =>dispatch=>{
    const url = `http://127.0.0.1:8000/api/blog/blog-detail/${slug}`
        const header = {
            headers:{
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`
            }
        }

        axios.patch(url,data,header)
            .then(res=>{
                // dispatch(delete_blog());
                
            })
            .catch(err=>{
                console.log(err);
            })
}