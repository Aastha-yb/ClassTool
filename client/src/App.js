import React, { useEffect, useState } from "react";
import Login from "./containers/Login"
import { BrowserRouter, Routes, Route,NavLink ,Link,Outlet} from "react-router-dom";
import Home from './components/Home';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import PublicRoute from './Utils/PublicRoute';
import PrivateRoute from './Utils/PrivateRoute';
import { getToken,removeUserSession ,getUser} from "./Utils/Common";
import axios from "axios";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Group from "./components/Group";
import Sidebar from "./components/Sidebar";
import CreateGroup from "./components/pages/CreateGroup";
import GroupDeets from "./components/pages/GroupDeets";
import Question from "./components/pages/Question";
import Submission from "./components/pages/MakeSubmission";
import Assignment from './components/Assignments';
import { SubmissionTable } from "./components/Table";
import SubmissionCard from "./components/SubmissionCard";
import Profile from "./components/Profile";
import JoinGroup from "./components/pages/JoinGroup";



function App(){

  
  const [authLoading, setAuthLaoding] = useState(true);

  useEffect(async() => {
      const token = getToken()
    if ( !token ){
      return
    } 

    await axios.get('http://localhost:5000/users/profile',{
      headers:{
        Authorization : `${token}`
        }
      })
    .then(() =>{
      setAuthLaoding(false);
      console.log(" Successfully retrieved the user profile")
    }).catch(err => {
      removeUserSession();
      setAuthLaoding(false)
      console.log("nope try again")
    })
  },[])

  if( authLoading && getToken()){
   return <div> Checking Authentication ...</div>    
  }
    return (
      <div>
        {/* <Navbar /> */}
        {/* <Sidebar /> */}
      <BrowserRouter>
          <Routes>
            <Route  path="/" element = {<Home />} />
            <Route exact path='/login' element={<PublicRoute/>}>
              <Route exact path='/login' element={<Login/>}/>
            </Route>
            <Route  path='/dashboard/' element={<PrivateRoute/>}>
              <Route  path='/dashboard/' element={ <Dashboard />}>
                <Route path='' element={<Group />}/>
                <Route path=':id/submit/:new' element={<Submission />}/>
                <Route path=':id/:new' element={<Question/>}>
                  <Route path='' element={<SubmissionTable/>} />
                  <Route path=':sub' element={<SubmissionCard/>} />
                </Route>
                <Route path=':id' element={<GroupDeets/>}/>
                <Route path='create' element={<CreateGroup/>}/>
                <Route path='join' element={<JoinGroup/>}/>
                <Route path='profile' element={<Profile/>}/>
              </Route>
            </Route>            
          </Routes>
    </BrowserRouter>
    </div>
         
    );
 
}

export default App;