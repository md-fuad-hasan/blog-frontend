import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import pro_pic from '../../asset/ProPic/images.png';

const MyUser = () =>{
    const {username} = useParams();
    const profile_pic = useSelector(state=>state.profile_pic);
    const fullname = useSelector(state=>state.fullname);
    const bio = useSelector(state=>state.bio);
    return(
        <div>
            <div className=" row mt-3">
                <div className="col-lg-4 shadow-sm p-3 mb-5 bg-body rounded ">
                    <div className="d-flex">
                        <div >
                            {
                            (profile_pic)?
                            <img src={profile_pic} alt="Profile Pic" className="image rounded" width="120px" />:
                            <img src={pro_pic} alt="Profile Pic" className="image rounded" width="120px" />
                            }
                            
                        </div>
                        <div  className=" ps-3">
                            <h3 >{fullname}</h3>
                            <p >{username}</p>
                        </div>
                    </div>
                    

                    <p>{bio}</p>
                    <div className="text-center">
                        <button className="btn btn-secondary w-50 ">Edit Profile</button>
                    </div>
                </div>
                <div className="col-lg-7 bg-info m-auto">
                    dfnjkdnfjdnjdsnjndjbnsdjndjn
                </div>

            </div>
        </div>
        
    );
}
export default MyUser;