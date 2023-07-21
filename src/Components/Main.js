import React, { useEffect } from "react";
import Header from "./Header/Header";
import { Navigate, Route, Routes } from "react-router";
import Login from "./Auth/Login";
import Signup from "./Auth/SignUp";
import Blog from "./Blog/Blog";
import { useDispatch, useSelector } from "react-redux";
import Logout from "./Auth/Logout";
import { auth_check } from "../redux/authActionCreators";
import MyUser from "./UserDetail/MyUser";

const Main =()=>{
    const dispatch = useDispatch();
   
    useEffect(()=>{
        dispatch(auth_check());

    })

    const token = useSelector(state=>state.token);
    let roots = null;
    if(token===null){
        roots = (<Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/" exact element={<Blog />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>)
    }else{
        roots = (<Routes>
                    <Route path="/logout" element={<Logout /> } />
                    <Route path="/user" element={<MyUser /> } />
                    <Route path="/" exact element={<Blog />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>)
    }

  
    return(
        <div>
            <Header />
            <div className="container">
                {roots}
            </div>
           
        </div>
    );

}

export default Main;    //  import in ../App.js