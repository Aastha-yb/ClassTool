import React, { useState } from 'react';
import "../styles/sidebar.css"
import {Link,NavLink ,Outlet} from 'react-router-dom'
import { getUser } from '../Utils/Common';

export default function Sidebar({role}){
    console.log("here the rile is", getUser().role)
    const [index, setIndex] = useState(0);
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <ul className="sidebarList">
                        <li >    
                          <Link 
                          to ='' 
                          onClick={()=>setIndex(0)}
                          className={`sidebarListItem ${index===0 ?'active':null}`} > 
                            Groups</Link>     
                        </li>
                        <li>    

                        { role === "student" && 
                            <Link  
                            to ='/dashboard/join'  
                            onClick={()=>setIndex(1)}
                            className={`sidebarListItem ${index===1 ?'active':null}`} > 
                            Join a Group
                             </Link>   }

                        {!(role === "student") && 
                            <Link  
                            to ='/dashboard/create'  
                            onClick={()=>setIndex(1)}
                            className={`sidebarListItem ${index===1 ?'active':null}`} > 
                            Create a Group
                             </Link>   }
                             
                        </li>
                        <li>    
                            <Link  
                            to ='/dashboard/profile'  
                            onClick={()=>setIndex(2)}
                            className={`sidebarListItem ${index===2 ?'active':null}`} > 
                                Profile</Link>   
                        </li>
                    </ul>

                </div>

            </div>
        </div> 
    )
}