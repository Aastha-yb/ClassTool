import React, { Component,useState } from "react";
import './Login.css'
import SignUp  from "./Signup";
import SignIn  from "./Signin";
import {Routes, Route,Link} from 'react-router-dom'


function App(){

    const [st, setSt] = useState(true);

    function handleClick (button)  {
        if(st && button != 'Login') {
            setSt(false)
        } else if(!st && button != 'Register') {
            setSt(true)
        }
    }

  

    return (
        <div className='formContainer'>
              <div className='formHeader'>
                  <div 
                    className={ st ? 'headerActive' : 'headerInActive' } 
                    onClick={() => handleClick('Login')}
                    >
                    <button className='headerButton'> Login </button>
                  </div>
                  <div 
                    className={ st ? 'headerInActive' : 'headerActive' } 
                    onClick={() => handleClick('Register')}
                    >
                    <button className='headerButton'> Register </button>
                  </div>
              </div>
              <div className='formBody'>
                {
                  st ? <SignIn />: <SignUp />
                }
              </div>
              <div> 
                {
                  st ? 
                    <p  className='headerText' style={{fontSize : "15px", padding: "20px 10px 40px 10px"}} >
                      New user ? {' '}
                      <Link  onClick={() => handleClick('Register')} style={{ color: "#EF5252"}} to={"/login"}>
                          Register
                      </Link>
                    </p>
                    :
                    <p  className='headerText' style={{fontSize : "15px", padding: "20px 10px 40px 10px"}} >
                      Already registered? {' '}
                      <Link  onClick={() => handleClick('Login')} style={{ color: "#EF5252"}} to={"/login"}>
                          Login
                      </Link>
                    </p>
                }
                
              </div>
              
           </div>
    )
}

export default App;