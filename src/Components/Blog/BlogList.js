import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { blog_list as blog_post } from "../../redux/actionCreators";
import Blog from "./Blog";

const BlogList = ()=>{
    const blog_list = useSelector(state=>state.blog_list);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(blog_post());
    },[])

    let blog =null;
    if(blog_list.length===0){

    }else{
        blog = blog_list.map(blog=>{
            return <Blog 
                title = {blog.blog_title}
                author = {blog.author_name}
                update_date = {blog.update_date}
                content = {blog.blog_content}
                image = {blog.blog_image}
                slug = {blog.slug}
                key = {blog.slug}
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