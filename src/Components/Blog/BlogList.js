import React from "react";
import { useSelector } from "react-redux";
import Blog from "./Blog";

const BlogList = ()=>{
    const blog_list = useSelector(state=>state.blog_list);
    let blog =null;
    if(blog_list.length===0){

    }else{
        blog = blog_list.map(blog=>{
            return <Blog 
                title = {blog.blog_title}
                content = {blog.blog_content}
                image = {blog.blog_image}
                slug = {blog.slug}
                key = {blog.id}
            />
        })
    }
    
    
    return(
        <div>
            {blog}
        </div>
    );
}

export default BlogList;  // import in Main.js