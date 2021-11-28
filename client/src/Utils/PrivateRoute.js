import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getToken,getUser } from './Common';

const PrivateRoute = () => {
    const auth = null; // determine if authorized, from context or however you're doing it

    // if( getToken())
    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    // console.log("the user role is",getUser().role)
    // if( !getToken()) return <Navigate to="/login" />
    // else if(getUser().role === "Teacher" ) return <Navigate to ="/teacher-dashboard" />
    // else return <Outlet />
    return !getToken() ? <Navigate to="/login" />: <Outlet /> ;
}

export default PrivateRoute