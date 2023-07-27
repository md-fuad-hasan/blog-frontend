import React from "react";
import date from 'date-and-time';
import { useSelector } from "react-redux";
import axios from "axios";

const BlogDetailShow = (props) =>{
    const username = useSelector(state=>state.username);
    const token = useSelector(state=>state.token)
    let update_date = props.blog_detail.update_date;
    update_date = new Date(update_date);
    update_date = date.format(update_date, 'MMMM DD, YYYY');

    const deleteBlog=()=>{
        const url = `http://127.0.0.1:8000/api/blog/blog-detail/${props.blog_detail.slug}`
        const header = {
            headers:{
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`
            }
        }

        axios.delete(url,header)
            .then(res=>{
                console.log(res);
                window.history.back();
                
            })
            .catch(err=>{
                console.log(err);
            })
    }


    return(
        <div>
            <div className="row d-flex flex-column mt-3">
                <div className=" col text-center">
                    <img src={props.blog_detail.blog_image} alt={props.blog_detail.blog_title} className="d-none d-md-inline d-xl-none img-fluid w-50" />
                    <img src={props.blog_detail.blog_image} alt={props.blog_detail.blog_title} className="d-inline d-md-none d-xl-none img-fluid w-100" />
                    <img src={props.blog_detail.blog_image} alt={props.blog_detail.blog_title} className="d-none d-lg-none d-xl-inline img-fluid " width="35%"/>
                </div>
                <div className="col">
                    <div className="mx-auto text-center  my-5">
                        <h1>{props.blog_detail.blog_title}</h1>
                        
                        <div className="d-flex justify-content-center">
                            <h4>by {props.blog_detail.author_name} | {update_date}</h4>
                            {
                                (props.blog_detail.author_name==username)?
                                <button className="btn btn-danger ms-2" onClick={deleteBlog}>Delete</button>:
                                null
                            }
                           
                        </div>

                    </div>
                    <div className="w-100">
                        <p>{props.blog_detail.blog_content}</p>
                    </div>

                </div>
            </div>
        </div>
        
    );
}
export default BlogDetailShow;