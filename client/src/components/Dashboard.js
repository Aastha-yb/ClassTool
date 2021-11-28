import React from 'react';
import StudentDashboard from './pages/StudentDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import { getToken, getUser } from '../Utils/Common';
import {Routes,Route} from 'react-router-dom'
import Navbar from './Navbar';
export default function Dash(){
    return (
            (getToken() && getUser().role == "Student") ? <StudentDashboard/> : <TeacherDashboard/>           
        )
}