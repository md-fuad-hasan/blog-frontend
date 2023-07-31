import React from "react";
import { useDispatch } from "react-redux";
import { login_error } from "../../redux/authActionCreators";

const LoginError = (props)=>{
    const dispatch = useDispatch();

    // setTimeout(()=>{
    //     dispatch(login_error(null));
    // },3000);

    const msgDone=()=>{
        dispatch(login_error(null));
    }

    return(
        <div>
            <div className="text-danger fs-5 border border-2 p-3 d-flex justify-content-between">
                <div >{props.loginErr}</div>
                <button className=" btn text-danger border border-0" onClick={msgDone}>X</button>
            </div>
                

        </div>
    )
}

export default LoginError;