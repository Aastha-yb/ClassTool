import React from 'react';
import '../styles/navbar.css';
import {useNavigate} from 'react-router-dom'
import { getUser, removeUserSession } from "../Utils/Common";



export default function Navbar(){

    const navigate = useNavigate();
    const handleLogout = () =>{
        removeUserSession();
        navigate("/login")
    }
    return (
        <div className="topbar">
            <div className="topbarWrapper">
                <div className="topLeft">
                    <span className="logo"> ClassTool </span>
                </div>
                <div className="topRight">
                    <div className="topbarIcons">
                    <input 
                        type="button"
                        value="Logout"
                        onClick={handleLogout}
                        className="logout"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}