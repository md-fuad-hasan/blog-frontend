import React from "react";
import {  useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import BlogDetailShow from "./BlogDetailShow";


const BlogDetail = () =>{
    const {slug} = useParams();
   

    const blog_list_detail = useSelector(state=>state.blog_list);

    
    let blog_detail=null;
    for(let blog of blog_list_detail){
        if(blog.slug===slug){
            blog_detail = blog;
            
            break;
        }
    }
    
    
    let blog = null;

    if(blog_detail===null){

    }else{
        blog = <BlogDetailShow  blog_detail={blog_detail} />
    }

    return(
        <div>
            {blog}
        </div>
        
    );
}
export default BlogDetail;