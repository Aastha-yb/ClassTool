import React, { useState } from "react";
import './Login.css'
import {Link} from 'react-router-dom';
import axios from 'axios';

function SignUp(){

    const [registerName , setRegisterName]=useState("");
    const [registerEmail , setRegisterEmail]=useState("");
    const [registerPassword , setRegisterPassword]=useState("");
    const [registerRole, setRegisterRole]=useState("student")
    const [error ,setError]=useState(null);
    const [success ,setSuccess]=useState(null);


    const register = () => {
        console.log(" User got is : ",registerRole  )
        axios({
            method: "post",
            data: {
                name: registerName,
                email: registerEmail,
                password: registerPassword
            },
            withCredentials: true,
            url: `http://localhost:5000/users/register-${registerRole}`,
        })
        .then( res => {
          console.log(res)
          setError(null);
          setSuccess('User Successfully regsitered')
        })
        .catch(err => {
          if(err.response.status === 401){
            setSuccess(null);
              setError(err.response.data.message)
          }
          else if( err.response.status === 403){
            setSuccess(null);
            setError('Please provide all the required information')
          }
          else{
            setSuccess(null);
            setError("Something went wrong.Please try again later")
          }
        })
    }

    return(      
        <div className='signUpContainer'>
          <h3 className='headerText'> Join Us today</h3>
          <div className='inputSection'>
            <input type='text' className='firstName' required  onChange={ e => setRegisterName(e.target.value)}/>
            <label className='inputLabel'>Name</label>
          </div>
          <div className='inputSection'>
            <input type='text' className='emailAddress' required  onChange={ e =>setRegisterEmail(e.target.value)}/>
            <label className='inputLabel'>Email Address</label>
          </div>
          <div className='inputSection'>
            <input type='password' className='password' required onChange={ e => setRegisterPassword(e.target.value)}/>
            <label className='inputLabel'>Password</label>
          </div>
          <div  style={{display: "flex"}}  className='inputSection' >
                <span  className='inputLabelRadio'> Are you a teacher? </span>{'     '}
                <input  type="radio" value="student" onChange={e => setRegisterRole(e.target.value)} checked={registerRole === "student" } name="no"/><label className='inputLabelRadio'>No</label>{'   '}
                <input type="radio" value="teacher" onChange={e => setRegisterRole(e.target.value)}  checked={registerRole === "teacher" } name="yes"/><label className='inputLabelRadio'>Yes</label>
          </div> 
          <div >
                {error && <div className="error">{error}</div> }
          </div>
          <div >
                {success && <div className="success">{success}</div> }
          </div>
          <button className='saveForm' onClick={register}> {'Submit' }</button>
            <br></br>
        </div>
      )
}

export default SignUp;