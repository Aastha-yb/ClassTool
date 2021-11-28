import React,{ useState }  from "react";
import { Link,useNavigate  } from "react-router-dom";
import './Login.css'
import axios from 'axios';
import {setUserSession,removeUserSession} from "../Utils/Common"

function SignIn(props){
    
    const navigate = useNavigate();
    const [registerEmail , setRegisterEmail]=useState("");
    const [registerPassword , setRegisterPassword]=useState("Student");
    const [registerRole, setRegisterRole]=useState("student")
    const [error ,setError]=useState(null);
    const [loading ,setLoading]=useState(false);
    

    const login = async(props) => {
        
        axios({
            method: "post",
            data: {
                email: registerEmail,
                password: registerPassword
            },
            withCredentials: true,
            url: `http://localhost:5000/users/login-${registerRole}`,
        }).then( res =>{ 
            if( res.data.success == true){
                console.log(res.data)
                setLoading(true);
                setUserSession(res.data.token,res.data.user)
                navigate("/dashboard")
            }                
            else{
                alert("Invalid Credentials")
            }
        }).catch(err =>{
            if(err.response.status === 401 || err.response.status === 403){
                setError(err.response.data.message)
            }
            else{
                setError("Something went wrong.Please try again later")
            }
        })
    }
    
    return (
        <div className='signInContainer'>
            <h3 className='headerText'>Welcome Back !</h3>
            <div className='inputSection'>
                <input type='email' className='userName' required  onChange={ e => setRegisterEmail(e.target.value)}/>
                    <label className='inputLabel'> Email</label>
            </div>
            
            <div className='inputSection' >
                <input type='password' className='password' required  onChange={ e => setRegisterPassword(e.target.value)}/>
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
            <input 
                type="button"
                value = {loading ? 'Loading...' : 'Login' }
                className='saveForm' 
                onClick ={ login }
                disabled ={loading} />
            <br></br>
        
        </div>

    )
}

export default SignIn;