import React, { useEffect, useState } from 'react';
import { getGroup, getSubmission, getAssignments,getToken ,getUser, formDate } from '../Utils/Common';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import "../styles/details.css"
import axios from 'axios'


export default function Details(){

    const userType = (getUser().role == "Teacher") ? "teacher" : "student";
    const [ assignments,setAssignments] = useState();
    const [ students,setStudents] = useState();

    useEffect(() =>{
        if( !getToken())
            console.log("Nothing Authenticated")
        
        else{
            axios({
                method: "get",
                url: `http://localhost:5000/${userType}/counts/${getGroup()._id}`,
            }).then((res) => {
                setAssignments(res.data.assignments)
                setStudents(res.data.students)
            }).catch(err =>{
                if( err.response.status){
                    // Render an element here.says ("No Groups to show")
                    console.log("Nothing to show ")
                }
            })
        }
    },[])


    return(
        <Paper style={{height: 430, margin:"20px",padding: "20px"}}>
            <Grid container spacing={1} className="subCard">
                <Grid item xs={12} > 
                    <div className="ans"> Group Details </div>
                </Grid>
                <Grid item xs ={2} />
                <Grid item xs={8} className="info" > 
                    <div className="deets">
                        <span>Course Name :</span>
                        {getUser().role ==="Teacher" && <span className="details">
                            {getGroup().courseName}
                        </span>}
                        {!(getUser().role ==="Teacher") && <span className="details">
                            {getGroup().groupId.courseName}
                        </span>}
                    </div>
                    <div className="deets">
                        <span>Course Description :</span>
                        {getUser().role ==="Teacher" && <span className="details">
                            {getGroup().desc || '--'}
                        </span>}
                        {!(getUser().role ==="Teacher") && <span className="details">
                            {getGroup().groupId.desc || '--'}
                        </span>}
                    </div>
                    <div className="deets">
                        <span>Instructor Name : </span>
                        {getUser().role ==="Teacher" && <span className="details">
                            {getGroup().teacherName}
                        </span> }
                        {!(getUser().role ==="Teacher") && <span className="details">
                            {getGroup().groupId.teacherName}
                        </span> }
                    </div>
                    <div className="deets">
                        <span>Instructor Email :</span>
                        {getUser().role ==="Teacher" &&<span className="details">
                            {getGroup().teacherEmail}
                        </span>}
                        {!(getUser().role ==="Teacher") &&<span className="details">
                            {getGroup().groupId.teacherEmail}
                        </span>}
                    </div>
                    <div className="deets">
                        <span>Created On: </span>
                        <span className="details">
                            {formDate(getGroup().createdAt)}
                        </span>
                    </div>
                    <div className="deets">
                        <span>Group Code: </span>
                        <span className="details">
                            {getGroup().groupCode}
                        </span>
                    </div>
                   
                </Grid>
                <Grid item xs ={2} />

                <Grid item xs={12} > 
                    <div className="count">
                        <div className="block"> 
                            <div className="newBanner">Total Students</div>
                            <div className="result"> {students}</div>
                        </div>
                        <div className="block"> 
                            <div className="newBanner">Total Assignment</div>
                            <div className="result"> {assignments}</div>
                        </div>
                    </div>
                </Grid>
                  
            </Grid>
        </Paper>
    )
}