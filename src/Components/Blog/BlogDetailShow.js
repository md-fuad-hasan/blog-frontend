import React from "react";
import date from 'date-and-time';
import { useDispatch, useSelector } from "react-redux";
import { delete_blog_done, delete_post } from "../../redux/actionCreators";
import BlogUpdate from "./BlogUpdate";

const BlogDetailShow = (props) =>{
    const username = useSelector(state=>state.username);
    const token = useSelector(state=>state.token)
    const delete_blog_msg = useSelector(state=>state.delete_blog_msg);
    const dispatch = useDispatch()

    let update_date = props.blog_detail.update_date;
    update_date = new Date(update_date);
    update_date = date.format(update_date, 'MMMM DD, YYYY');

    if(delete_blog_msg){
        dispatch(delete_blog_done());
        window.history.back();
    }

    const deleteBlog=()=>{
        dispatch(delete_post( props.blog_detail.slug,token));
 
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
                        
                        <div className="d-md-flex justify-content-center">
                            <h4>by {props.blog_detail.author_name} | {update_date}</h4>
                            {
                                (props.blog_detail.author_name===username)?
                                <div><button className="btn btn-danger" onClick={deleteBlog}>Delete</button>
                                <BlogUpdate slug={props.blog_detail.slug}/>
                                </div>:
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