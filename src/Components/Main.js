import React, { Component } from "react";
import Header from "./Header/Header";
import { Navigate, Route, Routes } from "react-router";
import Login from "./Auth/Login";
import Signup from "./Auth/SignUp";
import Blog from "./Blog/Blog";

class Main extends Component{

    render(){

        return(
            <div>
                <Header />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/" exact element={<Blog />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </div>
        );
    }
}

export default Main;    //  import in ../App.js