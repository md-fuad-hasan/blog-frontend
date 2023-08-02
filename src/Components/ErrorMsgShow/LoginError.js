import React from "react";
import { useDispatch } from "react-redux";
import { login_error, signup_error } from "../../redux/authActionCreators";

const LoginError = (props)=>{
    const dispatch = useDispatch();

    const msgDone=()=>{
        dispatch(login_error(null));
        dispatch(signup_error(null));
    }

    return(
        <div>
            <div className="text-danger fs-5 border border-2 p-2 d-flex justify-content-between">
                <div >{props.errMsg}</div>
                <button className=" btn text-danger border border-0" onClick={msgDone}>X</button>
            </div>
                

        </div>
    )
}

export default LoginError;