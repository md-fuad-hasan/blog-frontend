import React from "react";
import { useSelector } from "react-redux";
import pro_pic from '../../asset/ProPic/images.png';
import Blog from "../Blog/Blog";




const MyUser = () =>{
    const profile_pic = useSelector(state=>state.profile_pic);
    const fullname = useSelector(state=>state.fullname);
    const bio = useSelector(state=>state.bio);
    const username = useSelector(state=>state.username)
    const user_blog_list = useSelector(state=>state.user_blog_list);
    let blog =null;
    if(user_blog_list.length===0){

    }else{
        blog = user_blog_list.map(blog=>{
            return <Blog 
                title = {blog.blog_title}
                author = {blog.author_name}
                update_date = {blog.update_date}
                content = {blog.blog_content}
                image = {blog.blog_image}
                slug = {blog.slug}
                key = {blog.id}
            />
        })
    }
    
    return(
        <div>
            <div className=" row mt-3">
                <div className="col-lg-4 ">
                    <div className="shadow-sm p-3 mb-5 bg-body rounded ">
                        <div className="d-flex">
                            <div >
                                {
                                (profile_pic)?
                                <img src={profile_pic} alt="Profile Pic" className="image rounded" width="120px" />:
                                <img src={pro_pic} alt="Profile Pic" className="image rounded" width="120px" />
                                }
                                
                            </div>
                            <div  className=" ps-3">
                                <h3 >{fullname}</h3>
                                <p >{username}</p>
                            </div>
                        </div>
                    
                        <p>{bio}</p>
                        <div className="text-center">
                            <button className="btn btn-secondary w-50 ">Edit Profile</button>
                        </div>
                        <br />
                        <div>
                            <button className="btn btn-primary w-100">Create a Post</button>
                        </div>

                        

                    </div>
                    
                </div>
                <div className="col-lg-8">
                    {blog}
                </div>

            </div>
        </div>
        
    );
}
export default MyUser;