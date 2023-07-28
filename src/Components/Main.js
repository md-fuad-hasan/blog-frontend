import React, { useEffect } from "react";
import Header from "./Header/Header";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./Auth/Login";
import Signup from "./Auth/SignUp";
import BlogList from "./Blog/BlogList";
import { useDispatch, useSelector } from "react-redux";
import Logout from "./Auth/Logout";
import { auth_check } from "../redux/authActionCreators";
import MyUser from "./UserDetail/MyUser";
import BlogDetail from "./Blog/BlogDetail";

const Main =()=>{
    const dispatch = useDispatch();
    const token = useSelector(state=>state.token);

    
    useEffect(()=>{
        dispatch(auth_check());
    })

    let roots = null;
    if(token===null){
        roots = (<Routes>
                    <Route path="/" exact element={<BlogList />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/blog/:slug" element={<Navigate to="/login"/>}  />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>)
    }else{
        roots = (<Routes>
                    <Route path="/" exact element={<BlogList />} />
                    <Route path="/logout" element={<Logout /> } />
                    <Route path= "/users/:username" element={<MyUser /> } />
                    <Route path="/blog/:slug" element={<BlogDetail /> } />
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