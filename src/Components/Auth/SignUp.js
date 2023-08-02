import React, { useEffect } from "react";
import { Formik, Form, Field,ErrorMessage } from "formik";
import './Login.css';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login_error, signup_user } from "../../redux/authActionCreators";
import LoginError from "../ErrorMsgShow/LoginError";

const Signup = ()=>{
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const signupSuccess = useSelector(state=>state.signupSuccess);
    const signupErr = useSelector(state => state.signupErr);

    useEffect(()=>{
        dispatch(login_error(null))
    },[]);
    if(signupSuccess){
        navigate('/login');
    }

    let msg = null;
    let msgArray = [];
    if(signupErr){
        if(typeof signupErr === 'object'){
            for(const property in signupErr){
                msgArray.push(signupErr[property]);
             }
             msg = msgArray.map(err=>{
                
                return <LoginError errMsg = {err}/> 
             })
        }
        else{
            msg = <LoginError errMsg = {signupErr} />
        }
        
    }


    return(
        <div>
             <div className="all-form pt-2">
                <div>
                    {
                        (signupErr)?msg:null
                    }
            <Formik
                initialValues={{
                    email:'',
                    username:'',
                    password:'',
                    confirmedPassword:''
                }}
                validate={values => {
                    const errors = {};
                    if (!values.email) {
                      errors.email = 'Email is Required';
                    } else if (
                      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                      errors.email = 'Invalid email address';
                    }
                    if(!values.username){
                        errors.username="Username is required"
                    }
                    if(values.password.length<6){
                        errors.password = "Password must be 6 character or above"
                    }
                    if(values.password!==values.confirmedPassword){
                        errors.confirmedPassword = "Passwod don't matched"
                    }
                    
                    return errors;
                  }}
                onSubmit={(values,errors)=>{
                        
                    dispatch(signup_user(values.email, values.username, values.password));
                }}
            
            >
            {
                ()=>(
                    <div className="login-contain">
                        <h2 className="text-center">Create an account</h2>
                        <Form className="login-form form">
                            <Field  type="email" name="email" className="form-control" placeholder="Email Address" />
                            <ErrorMessage name="email" component="div" style={{color:"red"}}/>
                            <br/>
                            <Field  type="text" name="username" className="form-control" placeholder="Username" />
                            <ErrorMessage name="username" component="div" style={{color:"red"}}/>
                            <br/>
                            <Field  type="password" name="password" className="form-control" placeholder="Password" />
                            <ErrorMessage name="password" component="div" style={{color:"red"}}/>
                            <br/>
                            <Field  type="Password" name="confirmedPassword" className="form-control" placeholder="Confirmation Password" />
                            <ErrorMessage name="confirmedPassword" component="div" style={{color:"red"}}/>
                            <br/>
                            <button type="submit" className="btn btn-primary login">SignUp</button>
                        </Form>
                        <p className="text-center">Have you an account? <Link to="/login" style={{textDecoration:"none"}}>Login</Link></p>
                    </div>
                )
            }
            </Formik>
            </div>
            </div>
        </div>
    );
}

export default Signup;  // import  in Main.js