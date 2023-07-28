import React from "react";
import { Link } from "react-router-dom";
import date from 'date-and-time';
import { useDispatch, useSelector } from "react-redux";
import { delete_blog_done, delete_post } from "../../redux/actionCreators";
import BlogUpdate from "./BlogUpdate";

const Blog = (props)=>{
    const username = useSelector(state=>state.username);
    const token = useSelector(state=>state.token);
    const delete_blog_msg = useSelector(state=>state.delete_blog_msg);
    const dispatch = useDispatch();

    let update_date = props.update_date;
    update_date = new Date(update_date);
    update_date = date.format(update_date, 'MMMM DD, YYYY');

    
    if(delete_blog_msg){
        dispatch(delete_blog_done());
        window.location.reload(true);
    }

    const deleteBlog=()=>{
        dispatch(delete_post(props.slug,token));

        
    }


    return(
        <div>
            <div className="row shadow-sm p-3 mb-5 bg-body rounded">
                <div className="col-md-4">
                    <img src={props.image} alt="blog " width="100%"/>
                </div>
                <div className="col-md-8">
                    <h1>{props.title}</h1>
                    <div className="d-md-flex">
                        <h5 className="me-2">by {props.author} | {update_date}</h5>
                        
                        {
                            (props.author===username)?
                            <div><button className="btn btn-danger" onClick={deleteBlog}>Delete</button>
                            <BlogUpdate slug={props.slug}/>
                            </div>:
                            null
                        }
                    </div>
                    
                    
                    <br />
                    <p>{props.content+"...." }<Link to={`/blog/${props.slug}`} className="text-decoration-none"> See More</Link></p>
                </div>

            </div>

        </div>
    )
}

export default Blog;