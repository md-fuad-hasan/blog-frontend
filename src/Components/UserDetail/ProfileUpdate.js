import React, { useEffect, useState }from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { profile_detail, profile_update, profile_update_end } from "../../redux/authActionCreators";


const ProfileUpdate = (props) =>{
    const [fullname,setFullname] = useState('hello');
    const [bio, setBio] = useState('developer');
    const [image, setImage] = useState(null);
    const [modal,setModal] = useState(false);
    const token = useSelector(state=>state.token);
    const username = useSelector(state=>state.username);
    const user_fullname = useSelector(state=>state.fullname);
    const user_bio = useSelector(state=>state.bio);
    const userId = useSelector(state=>state.userId);
    const profile_update_msg = useSelector(state=>state.profile_update_msg);
    const dispatch = useDispatch();


    useEffect(()=>{
        dispatch(profile_detail(userId,token));
    },[])

    
    const isFileImage = (file)=>{
        return file && file['type'].split('/')[0] === 'image';
    }

    let proImage = null;

    const toggle = () =>{
        setModal(!modal);
        setFullname(user_fullname);
        setBio(user_bio);
 
    }
    let data = new FormData();

    function handleFullname(e){
        setFullname(e.target.value);
        data.append('fullname',fullname);

    }

    function handleBio(e){
        setBio(e.target.value);
        data.append('bio',bio);

    }

    let isImage = false;
    function handleImage(e){
        proImage = e.target.files[0];
        isImage = isFileImage(proImage);
        if(isImage){
            data.append('profile_pic',proImage);
        }

    }

    function handleSubmit(e){
        
        dispatch(profile_update(userId,token,data));
        setTimeout(()=>{
            window.location.reload(true);

        },1000)
       
        e.preventDefault();

    }


    return(
        <div className="d-inline">
            <button className="btn btn-secondary w-50 " onClick={toggle}>Edit Profile</button>
            
            <Modal isOpen={modal} centered={true} >
                <ModalHeader toggle={toggle} cssModule={{'modal-title': 'w-100 text-center'}}>
                    {username}'s profile
                </ModalHeader>
                <ModalBody>
                <form>
                    <label for="fullname" >FullName  </label>
                    <input type="text" name="fullname" className="form-control" value={fullname} onChange={handleFullname}/><br />
                    <label for="bio" >Bio </label>
                    <input type="text" name="bio" className="form-control" value={bio} onChange={handleBio}/><br />
                    <label for="image" >Profile Pic  </label>
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

export default ProfileUpdate;