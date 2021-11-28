import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { IconButton, Typography } from '@material-ui/core';
import { DeleteOutlined } from '@material-ui/icons';
import axios from 'axios';
import {getGroup, getToken,getUser,setGroup} from "../Utils/Common"
import {Link , useNavigate} from 'react-router-dom'


export default function GroupCard({ groupDeets, handleDelete,leaveGroup }){

    const navigate = useNavigate();

    const handleClick = () => {
        const userType = (getUser().role == "Teacher") ? "teacher" : "student";
        console.log(" int he handleClick",groupDeets._id);
        axios({
            method: "post",
            data: {
                _id: groupDeets._id
            },
            withCredentials: true,
            url: `http://localhost:5000/${userType}/deleteGroup`,
        }).then( res =>{ 
            // console.log(" THE REQUEST SENT IS: ", req.body)
            console.log("the response recieved is: ",res)
        }).catch(err =>{
            console.log("the error is: ",err.response.status);
        })
        
    }

    const goToDetails = (data) => {
        setGroup(data);
        if( getUser().role === "Teacher")
            navigate(`${data.courseName}`)
        else
            navigate(`${data.groupId.courseName}`)

    };
    return(
        <div>
        {/* <Link to={`/dashboard/${groupDeets.courseName}`}> */}
            
            { getUser().role === "Teacher" && 
            <Card elevation={3} onClick={() => goToDetails(groupDeets)}>
                <CardHeader
                    action={
                        <IconButton onClick={() =>handleDelete(groupDeets._id)}>
                          <DeleteOutlined />
                        </IconButton>
                    }
                    title ={groupDeets.courseName}
                    subheader={groupDeets.teacherEmail}
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary">
                        {groupDeets.desc}
                    </Typography>
                </CardContent>
            </Card>}

            {!(getUser().role === "Teacher") && 
            <Card elevation={3} onClick={() => goToDetails(groupDeets)}>
            <CardHeader
                action={
                    <IconButton onClick={() =>leaveGroup(groupDeets)}>
                         <DeleteOutlined />
                    </IconButton>
                }
                title ={groupDeets.groupId.courseName}
                subheader={groupDeets.groupId.teacherEmail}
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary">
                    {groupDeets.groupId.desc}
                </Typography>
            </CardContent>
        </Card>}
        </div>
    )
}