import React from "react";
import '../styles/navbar.css';
import {useNavigate} from 'react-router-dom'
import { getUser, removeUserSession } from "../Utils/Common";
import Image from '../../public/10516.jpg'
import "../styles/home.css"

const Home = () => {

    const navigate = useNavigate();

    const handleLogin =() =>{
        console.log("Login")
        navigate("/login")
    }
    return(
        <main style={{height:"100vh"}}>
            <div className="topbar">
            <div className="topbarWrapper">
                <div className="topLeft">
                    <span className="logo"> ClassTool </span>
                </div>
                <div className="topRight">
                    <div className="topbarIcons">
                    </div>
                </div>
            </div>
            </div>

            <div className="first">
                <div className="second" >
                    <div className="head"> ClassTool</div>
                    <div className="body">
                        Create and submit assignments, join and create course groups, and stay updated about all the course events. 
                        One stop tool for Instructors and Students.
                    </div>
                    <div className="button">
                        <input 
                            style={{backgroundColor: "#EF5252", borderRadius: "5px",color: "white"}}
                            type="button"
                            value = "Get Started"
                            className='saveForm' 
                            onClick={handleLogin}/>
                    </div>
                </div>
                <div>
                <img style={{height:"550px"}} src={Image} alt="No data to show" />

                </div>
            </div>
        </main>
        
    )
}

export default Home;