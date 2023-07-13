import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import './Login.css';
import { Link } from "react-router-dom";

const Login = ()=>{
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
                    console.log(values);
                }}
            
            >
            {
                ({errors})=>(
                    <div className="login-contain">
                        <h2>Login Page</h2>
                        <Form className="login-form form">
                           
                            <Field  type="text" name="username" className="form-control" placeholder="Username" />
                            <ErrorMessage name="username" component="div" style={{color:"red"}}/>
                            <br/>
                            <Field  type="password" name="password" className="form-control" placeholder="Password" />
                            <ErrorMessage name="password" component="div" style={{color:"red"}}/>
                            <br/>
                            <button type="submit" className="btn btn-primary login">Login</button>
                        </Form>
                        <p>Don't have you an account? <Link to="/signup" style={{textDecoration:"none"}}>SignUp</Link></p>
                    </div>
                )
            }
            </Formik>
            </div>
      
       
        
        
    );
}

export default Login;  // import in Main.js