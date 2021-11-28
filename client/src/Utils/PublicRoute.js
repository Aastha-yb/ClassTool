// import React, { Component } from 'react';
// import { Redirect } from 'react-router';
// import { Route } from 'react-router';
// import { getToken } from './Common';

// const PublicRoute= ( {component : Component ,  ...rest}) =>{
//     return (
//         <Route
//             {...rest}
//             render = {props =>{
//                 return !getToken() ? <Component {...props} />
//                     : <Redirect to ={{ pathname : "/dashboard"}} />
//             }}
//         />
//     )
// }

// export default PublicRoute
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getToken } from './Common';

const PublicRoute = () => {
    const auth = null; // determine if authorized, from context or however you're doing it

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return !getToken() ? <Outlet /> : <Navigate to="/dashboard" />;
}

export default PublicRoute