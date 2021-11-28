import React, {useEffect, useState} from 'react';
import "../styles/groups.css"
import "../styles/lists.css"
import axios from 'axios';
import {getToken,getUser,getGroup,setAssignments, formDate} from "../Utils/Common"
import GroupCard from './GroupCard';
import Container from "@material-ui/core/Container";
import {Outlet, Link, useNavigate} from 'react-router-dom'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { AssignmentReturnSharp } from '@material-ui/icons';
import NoData from './Nodata';



function groups(){

    const userType = (getUser().role === "Teacher") ? "teacher" : "student";
    const [assignment,setAssignment] = useState([])
    const navigate = useNavigate();

    useEffect(() =>{

        if( !getToken())
            console.log("Nothing Authenticated")
        
        else if ( userType === "student"){
            axios({
                method: "get",
                url: `http://localhost:5000/${userType}/getAssignments/query?id=${getGroup().groupId._id}`,
            }).then((res) => {
                setAssignment(res.data)
                console.log(res.data)
            }).catch(err =>{
                if( err.response.status){
                    console.log("Nothing to show ")
                }
            })
        }
        else{
            axios({
                method: "get",
                url: `http://localhost:5000/${userType}/getAssignments/query?id=${getGroup()._id}`,
            }).then((res) => {
                setAssignment(res.data)
                console.log(res.data)
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
            url: `http://localhost:5000/${userType}/deleteAssignment/`,
        }).then()
        .catch(err =>{
            console.log("the error is: ",err.response.status);
        })

        const newQues = assignment.filter( ques => ques._id != id)
        setAssignment(newQues);
        
    }
    const goToDetails = (data) => {
        setAssignments(data);
        if( userType === "teacher")
            navigate(`${data.topic}`)
        else
            navigate(`submit/${data.topic}`)
    };

    return (
        <div className="group">
            {assignment.length ===0 && <NoData page={"Assignments"}/>}
            <Container>
                <List >
                    {assignment.map(ques =>(
                        <ListItem 
                            button
                            className="list"
                            key={ques._id}
                            onClick={() => goToDetails(ques)}>
                            <ListItemText >{ques.topic}</ListItemText>
                            <ListItemText>{formDate(ques.createdAt)}</ListItemText>
                            <ListItemSecondaryAction>
                                { userType === "teacher" && 
                                <IconButton edge="end" aria-label="delete" style ={{fontSize: "18px"}} 
                                    onClick={() =>{
                                        console.log("in the delete button");
                                        handleDelete(ques._id)
                                    }}>
                                    <DeleteIcon style ={{fontSize: "18px"}} />
                                </IconButton>}
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            </Container>
        </div>
    )
}

export default groups; 