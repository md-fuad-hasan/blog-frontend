import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import './Login.css';
import { Link,  } from "react-router-dom";

import { useDispatch, } from "react-redux";
import { login_user } from "../../redux/authActionCreators";

const Login = ()=>{
    const dispatch = useDispatch();


    return(
        
            
            <div className="all-form">
            <Formik
                initialValues={{
                   
                    username:'',
                    password:'',
                   
                }}
                validate={values => {
                    const errors = {};
                    if (!values.username) {
                      errors.username = 'Username is Invalid';
                    }
                    if(values.password.length<6){
                        errors.password = 'Password must be 6 character or above';
                    }
                    return errors;
                  }}
                onSubmit={(values)=>{
                    dispatch(login_user(values.username, values.password));

                }}
            
            >
            {
                ({errors})=>(
                    <div className="login-contain">
                        <h2 className="text-center">Login Page</h2>
                        <Form className="login-form form">
                           
                            <Field  type="text" name="username" className="form-control" placeholder="Username Or Email" />
                            <ErrorMessage name="username" component="div" style={{color:"red"}}/>
                            <br/>
                            <Field  type="password" name="password" className="form-control" placeholder="Password" />
                            <ErrorMessage name="password" component="div" style={{color:"red"}}/>
                            <br/>
                            <button type="submit" className="btn btn-primary login">Login</button>
                        </Form>
                        <p className="text-center">Don't have you an account? <Link to="/signup" style={{textDecoration:"none"}}>SignUp</Link></p>
                    </div>
                )
            }
            </Formik>
            </div>
      
       
        
        
    );
}

export default Login;  // import in Main.js