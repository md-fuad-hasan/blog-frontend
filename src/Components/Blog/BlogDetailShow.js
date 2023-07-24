import React from "react";


const BlogDetailShow = (props) =>{

    let update_date = props.blog_detail.update_date;
    update_date = new Date(update_date).toDateString();

    return(
        <div>
            <div className="row d-flex flex-column mt-3">
                <div className=" col text-center">
                    <img src={props.blog_detail.blog_image} alt={props.blog_detail.blog_title} className="d-none d-md-inline d-xl-none img-fluid w-50" />
                    <img src={props.blog_detail.blog_image} alt={props.blog_detail.blog_title} className="d-inline d-md-none d-xl-none img-fluid w-100" />
                    <img src={props.blog_detail.blog_image} alt={props.blog_detail.blog_title} className="d-none d-lg-none d-xl-inline img-fluid " width="40%"/>
                </div>
                <div className="col">
                    <div className="mx-auto text-center  my-5">
                        <h1>{props.blog_detail.blog_title}</h1>
                        <h4>by {props.blog_detail.author_name} | {update_date}</h4>

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