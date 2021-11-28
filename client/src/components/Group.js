import React, {useEffect, useState} from 'react';
import "../styles/groups.css"
// import FeaturedInfo from './pages/featuredInfo';
import axios from 'axios';
import {getToken,getUser} from "../Utils/Common"
import GroupCard from './GroupCard';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import {Outlet, Link} from 'react-router-dom'
import NoData from './Nodata';

function groups(){

    const userType = (getUser().role === "Teacher") ? "teacher" : "student";
    const [groups,setGroups] = useState([])
    
    useEffect(() =>{

        if( !getToken())
            console.log("Nothing Authenticated")
        
        else{
            axios({
                method: "get",
                url: `http://localhost:5000/${userType}/${getUser().email}`,
            }).then((res) => {
                setGroups(res.data)
            }).catch(err =>{
                if( err.response.status){
                    console.log("Nothing to show ")
                }
            })
        }

    },[])

    const handleDelete = (id) => {
        const userType = (getUser().role == "Teacher") ? "teacher" : "student";
        axios({
            method: "post",
            data: {
                _id: id
            },
            withCredentials: true,
            url: `http://localhost:5000/${userType}/deleteGroup`,
        }).then()
        .catch(err =>{
            console.log("the error is: ",err.response.status);
        })

        const newGroups = groups.filter( group => group._id != id)
        setGroups(newGroups);
        
    }

    const leaveGroup = (req) => {
        axios({
            method: "post",
            data: {
                studentEmail : req.studentEmail,
                groupCode : req.groupCode
            },
            withCredentials: true,
            url: `http://localhost:5000/student/leaveGroup`,
        }).then()
        .catch(err =>{
            console.log("the error is: ",err.response.status);
        })

        const newGroups = groups.filter( group => group.groupCode!= req.groupCode)
        setGroups(newGroups);
        
    }

    return (
        <div className="group">
           
            <Container>
                <div className="heading"><Link to=""> {getUser().name}'s Groups </Link></div> 
                {groups.length ===0 && <NoData page={"Groups"}/>}
                <Grid container spacing={3}>
                    {groups.map(group =>(
                        <Grid item key={group._id} xs={12} md={6} lg={4} >
                            <GroupCard groupDeets={group} handleDelete={handleDelete} leaveGroup={leaveGroup}/>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </div>
    )
}

export default groups; 