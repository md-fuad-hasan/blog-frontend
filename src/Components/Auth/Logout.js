import React from "react";
import { useDispatch } from "react-redux";
import { logout_user } from "../../redux/authActionCreators";

const Logout =()=>{
    const dispatch = useDispatch();

    dispatch(logout_user());

    return(
        <div>
            log out
        </div>
    );
}

export default Logout;