import React, { useEffect } from "react";
import {  useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import BlogDetailShow from "./BlogDetailShow";
import { blog_detail } from "../../redux/actionCreators";


const BlogDetail = () =>{
    const {slug} = useParams();
    const blog_detail_data = useSelector(state=>state.blog_detail_data);
    const token = useSelector(state=>state.token);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(blog_detail(slug,token));
    },[]);

    
    
    let blog = null;

    if(blog_detail_data===null){

    }else{
        blog = <BlogDetailShow  blog_detail={blog_detail_data} />
    }

    return(
        <div>
            {blog}
        </div>
        
    );
}
export default BlogDetail;