import React, { useEffect, useState }from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { blog_detail, update_post } from "../../redux/actionCreators";


const BlogUpdate = (props) =>{
    const [title,setTitle] = useState('hello');
    const [content, setContent] = useState('hello');
    const [image, setImage] = useState(null);
    const [modal,setModal] = useState(false);
    const token = useSelector(state=>state.token);
    const blog_detail_data = useSelector(state=>state.blog_detail_data);
    const dispatch = useDispatch();


    useEffect(()=>{
        dispatch(blog_detail(props.slug,token));
       
    },[])
        
    
    const isFileImage = (file)=>{
        return file && file['type'].split('/')[0] === 'image';
    }

    let blogImage = null;

    const toggle = () =>{
        setModal(!modal);
        setTitle(blog_detail_data.blog_title);
        setContent(blog_detail_data.blog_content);
 
    }

    function handleTitle(e){
        setTitle(e.target.value)
    }

    function handleContent(e){
        setContent(e.target.value)
    }
    let isImage = false;
    function handleImage(e){
        blogImage = e.target.files[0];
        isImage = isFileImage(blogImage);


    }

    function handleSubmit(e){
        let data = new FormData();
        data.append('blog_title',title);
        data.append('blog_content',content);
        if(isImage){
            data.append('blog_image',blogImage);

        }
        
        dispatch(update_post(props.slug,token,data));
        window.location.reload(true);
        e.preventDefault();

    }


    return(
        <div className="d-inline">
            <button className="btn btn-info ms-2" onClick={toggle}>Edit</button>
                            <Modal isOpen={modal}>
                                <ModalHeader toggle={toggle} cssModule={{'modal-title': 'w-100 text-center'}}>
                                    Edit the Post
                                </ModalHeader>
                                <ModalBody>
                                <form>
                                    <input type="text" name="title" className="form-control" value={title} onChange={handleTitle}/><br />
                                    <textarea name="content" rows={10} className="form-control" value={content} onChange={handleContent}/><br />
                                    <input type="file" name="image"  className="form-control" value={image} onChange={handleImage}/><br />
                                    
                                    <button className="btn btn-primary w-100"  onClick={handleSubmit}>Update</button>

                                </form>

                                </ModalBody>
                                <ModalFooter>

                                </ModalFooter>
                            </Modal>
                            

        </div>
    )

}

export default BlogUpdate;