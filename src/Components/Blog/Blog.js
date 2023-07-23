import React from "react";
import { Link } from "react-router-dom";

const Blog = (props)=>{
    return(
        <div >
            <div className="row shadow-sm p-3 mb-5 bg-body rounded">
                <div className="col-md-4">
                    <img src={props.image} alt="blog " width="100%"/>
                </div>
                <div className="col-md-8">
                    <h2>{props.title}</h2>
                    <p>{props.content.slice(0,500)}<Link to={`/blog/${props.slug}`}>See More</Link></p>
                </div>

            </div>

        </div>
    )
}

export default Blog;