import React from "react";
import {useNavigate} from 'react-router-dom'
import { getUser, removeUserSession } from "../../Utils/Common";
import Sidebar from "../Sidebar";
import "../../styles/dashboard.css"
import Group from "../Group";
import{BrowserRouter as Router, Outlet, Routes,Route} from 'react-router-dom'
import Home from "../Home";
import Navbar from "../Navbar";
function TeacherDashboard(){

    const user = getUser()
    const navigate = useNavigate();
    
    const handleLogout = () =>{
        removeUserSession();
        navigate("/login")
    }
    return(
        <div className="container" style={{display:"flex", flexDirection:"column"}}>
            <div> <Navbar/></div>
            <div style={{display:"flex", flexDirection:"row"}}>
                <Sidebar/>
                <Outlet />
            </div>
        </div>
    )
}

export default TeacherDashboard;