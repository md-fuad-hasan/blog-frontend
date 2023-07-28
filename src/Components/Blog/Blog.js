import React, { useState } from "react";
import { Link } from "react-router-dom";
import date from 'date-and-time';
import { useDispatch, useSelector } from "react-redux";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { delete_blog_done, delete_post } from "../../redux/actionCreators";

const Blog = (props)=>{
    const [modal,setModal] = useState(false);
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

    const toggle = () =>setModal(!modal);

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
                            (props.author===username)?
                            <div><button className="btn btn-danger ms-2" onClick={deleteBlog}>Delete</button>
                            <button className="btn btn-info ms-2" onClick={toggle}>Edit</button>
                            <Modal isOpen={modal}>
                                <ModalHeader toggle={toggle}>
                                    Edit the Post
                                </ModalHeader>
                                <ModalBody>

                                </ModalBody>
                                <ModalFooter>

                                </ModalFooter>
                            </Modal>
                            
                            
                            
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