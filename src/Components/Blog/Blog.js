import React from "react";
import { Link } from "react-router-dom";
import date from 'date-and-time';

const Blog = (props)=>{
    let update_date = props.update_date;
    update_date = new Date(update_date).toDateString();
    ;
    return(
        <div>
            <div className="row shadow-sm p-3 mb-5 bg-body rounded">
                <div className="col-md-4">
                    <img src={props.image} alt="blog " width="100%"/>
                </div>
                <div className="col-md-8">
                    <h1>{props.title}</h1>
                    <h5>by {props.author} | {update_date}</h5>
                    <br />
                    <p>{props.content+"...." }<Link to={`/blog/${props.slug}`} className="text-decoration-none"> See More</Link></p>
                </div>

            </div>

        </div>
    )
}

export default Blog;