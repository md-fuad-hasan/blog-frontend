import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import pro_pic from '../../asset/ProPic/default_avatar.jpg';
import Blog from "../Blog/Blog";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import { ErrorMessage, Field, Form, Formik } from "formik";
import axios from "axios";
import { user_blog_list as user_blog_post,blog_list } from "../../redux/actionCreators";
import ProfileUpdate from "./ProfileUpdate";




const MyUser = () =>{
    const [modal,setModal] = useState(false);
    const profile_pic = useSelector(state=>state.profile_pic);
    const fullname = useSelector(state=>state.fullname);
    const bio = useSelector(state=>state.bio);
    const username = useSelector(state=>state.username)
    const user_blog_list = useSelector(state=>state.user_blog_list);
    const userId = useSelector(state=>state.userId);
    const token = useSelector(state=>state.token);
    const dispatch = useDispatch()


    useEffect(()=>{
       
        dispatch(user_blog_post(userId,token));
    },[])

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
                key = {blog.slug}
                
            />
        })
    }

    const toggle = () =>setModal(!modal);

    let blogImage = null;

    const isFileImage = (file)=>{
        return file && file['type'].split('/')[0] === 'image';
    }
    let isImage = false;
    const handleImage=(e)=>{
        blogImage = e.target.files[0];

        isImage = isFileImage(blogImage);

        
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
                            <ProfileUpdate />
                        </div>
                        <br />
                        <div>
                            <Button color="primary" onClick={toggle} className="btn w-100">Create a Post</Button>
                            <Modal isOpen={modal} centered={true}>
                                <ModalHeader toggle={toggle} cssModule={{'modal-title': 'w-100 text-center'}}>
                                    Create Post         
                                </ModalHeader>
                                <ModalBody>
                                    <Formik
                                        initialValues={{
                                            title:'',
                                            content:'',
                                            image:null,
                                        }} 
                                        validate={values => {
                                            const errors = {};
                                            if (!values.title) {
                                              errors.title = 'Title is Invalid';
                                            }
                                            if(!values.content){
                                                errors.content = 'This field is required';
                                            }
                                            if(blogImage===null || !isImage){
                                                errors.image = 'Image must be included';

                                            }
                                        

                                            return errors;
                                          }}
                                        onSubmit={(values)=>{
                                            
                                            let data = new FormData();
                                            data.append('blog_title',values.title);
                                            data.append('blog_content',values.content);
                                            data.append('blog_image',blogImage);
                                            data.append('author',userId);

                                            const url = "http://127.0.0.1:8000/api/blog/create/";
                                            const header = {
                                                headers:{
                                                    "Content-Type": "multipart/form-data",
                                                    "Authorization": `Bearer ${token}`
                                                }
                                            }
                                            axios.post(url,data,header)
                                                .then(res=>{
                                                    toggle();
                                                    dispatch(user_blog_post(userId,token));
                                                    dispatch(blog_list());
                                                    
                                                })
                                                .catch(err=>{
                                                    console.log(err);
                                                })
                                            
                                            
                                        }}
                                    
                                    >

                                        {({values,onChange})=>(
                                            <Form>
                                                <Field  type="text" name="title" className="form-control" placeholder="Blog Title" />
                                                <ErrorMessage name="title" component="div" style={{color:"red"}}/>

                                                <br />
                                                <Field as="textarea" name="content" className="form-control" rows="10" placeholder="Write something what you want to post...." />
                                                <ErrorMessage name="content" component="div" style={{color:"red"}}/>
                                                <br />
                                                <Field type="file" name="image" className="form-control" onChange={handleImage}/>
                                                <ErrorMessage name="image" component="div" style={{color:"red"}}/>            
                                                <br />
                                                <Button type="submit" color="primary" className="w-100">Post</Button>   

                                            </Form>
                                        )}

                                        


                                    </Formik>

                                </ModalBody>
                                
                            </Modal>
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