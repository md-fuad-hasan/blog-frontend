import React from "react";
import { Link } from "react-router-dom";
import date from 'date-and-time';
import { useSelector } from "react-redux";
import axios from "axios";

const Blog = (props)=>{
    const username = useSelector(state=>state.username);
    const token = useSelector(state=>state.token);
    let update_date = props.update_date;
    update_date = new Date(update_date).toDateString();
    

    const deleteBlog=()=>{
        const url = `http://127.0.0.1:8000/api/blog/blog-detail/${props.slug}`
        const header = {
            headers:{
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`
            }
        }

        axios.delete(url,header)
            .then(res=>{
                console.log(res);
                window.location.reload(true);
            })
            .catch(err=>{
                console.log(err);
            })
    }


    return(
        <div>
            <div className="row shadow-sm p-3 mb-5 bg-body rounded">
                <div className="col-md-4">
                    <img src={props.image} alt="blog " width="100%"/>
                </div>
                <div className="col-md-8">
                    <h1>{props.title}</h1>
                    <div className="d-flex">
                        <h5>by {props.author} | {update_date}</h5>
                        
                        {
                            (props.author==username)?
                            <button className="btn btn-danger ms-2" onClick={deleteBlog}>Delete</button>:
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