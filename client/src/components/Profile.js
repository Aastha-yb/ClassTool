import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import { getUser, getGroup,getToken} from '../Utils/Common';
import Link from '@material-ui/core/Link';
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import "../styles/test.css"
import "../styles/details.css"
import axios from 'axios'


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 800,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));




export default function Profile() {
  const classes = useStyles();

  const [assignments,setAssignments] = useState();
  const [groups,setGroups] = useState();
  const [submissions,setSubmissions] = useState();

  useEffect(() =>{
    if( !getToken())
        console.log("Nothing Authenticated")

    else if (getUser().role === "Teacher"){
        axios({
            method: "get",
            url: `http://localhost:5000/teacher/teacherDeets/${getUser().email}`,
        }).then((res) => {
            setAssignments(res.data.assignments)
            setGroups(res.data.groups)
        }).catch(err =>{
            if( err.response.status){
                // Render an element here.says ("No Groups to show")
                console.log("Nothing to show ")
            }
        })
    }
    else{
        axios({
            method: "get",
            url: `http://localhost:5000/student/studentDeets/${getUser().email}`,
        }).then((res) => {
            setSubmissions(res.data.submissions)
            setGroups(res.data.groups)
        }).catch(err =>{
            if( err.response.status){
                // Render an element here.says ("No Groups to show")
                console.log("Nothing to show ")
            }
        })
    }
  },[])

  return (
    <React.Fragment>
      <CssBaseline />
      <div className="group">
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h4" variant="h5" align="center">
            My Profile
          </Typography>
          <Grid container spacing={1} className="subCard">
                <Grid item xs ={2} />
                <Grid item xs={8} className="info" > 
                    <div className="deets">
                        <span>Name :</span>
                        <span className="details">
                            {getUser().name}
                        </span>
                    </div>
                    <div className="deets">
                        <span>Email :</span>
                        <span className="details">
                            {getUser().email }
                        </span>
                    </div>
                    <div className="deets">
                        <span>Role : </span>
                        <span className="details">
                            {getUser().role}
                        </span>
                    </div>                 
                </Grid>
                <Grid item xs ={2} />

                <Grid item xs={12} > 
                    { getUser().role === "Teacher" && <div className="count">
                        <div className="block"> 
                            <div className="newBanner">Groups Created : </div>
                            <div className="result"> {groups}</div>
                        </div>
                        <div className="block"> 
                            <div className="newBanner">Total Assignments Created :</div>
                            <div className="result"> {assignments}</div>
                        </div>
                    </div>}
                    { !(getUser().role === "Teacher") && <div className="count">
                        <div className="block"> 
                            <div className="newBanner">Groups Joined : </div>
                            <div className="result"> {groups}</div>
                        </div>
                        <div className="block"> 
                            <div className="newBanner">Total Submissions done :</div>
                            <div className="result"> {submissions}</div>
                        </div>
                    </div>}
                </Grid>
                  
            </Grid>
        </Paper>
        <Copyright />
      </main>
      </div>
    </React.Fragment>
  );
}