import React, {useEffect, useState} from 'react';
import { getAssignments, getGroup , getUser,formDate} from '../../Utils/Common';
import "../../styles/groups.css"
import "../../styles/assignment.css"
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import TextField from '@material-ui/core/TextField';
import {Outlet, Link, useNavigate} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import "../../styles/submission.css"
import axios from 'axios'


const Accordion = withStyles({
    root: {
      border: '1px solid rgba(0, 0, 0, .125)',
      boxShadow: 'none',
      '&:not(:last-child)': {
        borderBottom: 0,
      },
      '&:before': {
        display: 'none',
      },
      '&$expanded': {
        margin: 'auto',
      },
    },
    expanded: {},
  })(MuiAccordion);


const AccordionSummary = withStyles({
    root: {
      backgroundColor: 'rgba(0, 0, 0, .03)',
      borderBottom: '1px solid rgba(0, 0, 0, .125)',
      marginBottom: -1,
      minHeight: 56,
      '&$expanded': {
        minHeight: 56,
      },
    },
    content: {
      '&$expanded': {
        margin: '12px 0',
      },
    },
    expanded: {},
  })(MuiAccordionSummary);


const AccordionDetails = withStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
    },
  }))(MuiAccordionDetails);

  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
  }));

function Submission(){

    const classes = useStyles();
    const [expanded, setExpanded] = React.useState('panel1');
    const [answer, setAnswer] = useState();
    const[error, setError] = useState();
    const[success, setSuccess] = useState();
    const[done, setDone] = useState(false);
    const[marks, setMarks] = useState();

    useEffect(async () =>{

      await axios({
        method: "post",
        data: {
            id : getAssignments()._id,
            email: getUser().email
        },
        withCredentials: true,
        url: `http://localhost:5000/student/getSubmissionDeets`,
      })
      .then( res => {
        setDone(res.data[0].markAsDone);
        setMarks(res.data[0].marksObtained);
      })
      .catch(err => {
        console.log("Error", err)
        if( err.response.status === 403){
            setDone(false);
            setMarks(null);
        }
        else{
            setDone(false);
            setError("Something went wrong.Please try again later")
        }
      }) 

    },[])

    const navigate = useNavigate();
    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };  

    const handleClick = () => {
      axios({
          method: "post",
          data: {
              assignmentId : getAssignments()._id,
              markAsDone : true,
              answer: answer,
              groupId : getGroup().groupId._id,
              studentName: getUser().name,
              studentEmail: getUser().email
          },
          withCredentials: true,
          url: `http://localhost:5000/student/addSubmission`,
      })
      .then( res => {
        console.log(res)
        setError(null);
        setDone(true);
        setSuccess(`Successfully submited the assignment!`)
      })
      .catch(err => {
        console.log("Error", err)
        setDone(false);
        if(err.response.status === 400 || err.response.status === 403){
            setSuccess(null);
            setError(err.response.data.message)
        }
        else{
            setSuccess(null);
            setError("Something went wrong.Please try again later")
        }
      })
    } 


    

    return (
        <div className="group">
          <Container>
            <div className="heading">
              <Link to="../"> {getUser().name}'s Groups </Link>
              {' '} / {' '}
              <Link to={`/dashboard/${getGroup().groupId.courseName}`} replace> {getGroup().groupId.courseName} </Link>
              {' '} / {' '}
              <Link to=""> {getAssignments().topic} </Link>
            </div> 

            <div>
              <Accordion square expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                    <AccordionSummary aria-controls="panel3d-content" id="panel3d-header" >
                    <Typography className={classes.heading}>{getAssignments().topic}{' '}</Typography>
                      <Typography className={classes.secondaryHeading}>
                        Max Marks : {' '} {getAssignments().maxMarks}
                      </Typography>                    
                      </AccordionSummary>
                    <AccordionDetails>
                    <div>
                      <div>
                          <span className="tag"> Question :</span> {' '} {getAssignments().question}
                      </div>
                      <br></br>
                      <div>
                        <span className="tag">Additional Remarks :</span>{' '} { getAssignments().comments}
                      </div>
                      <br></br>
                      <div>
                        <span className="tag">Posted On :</span>{' '} { formDate(getAssignments().createdAt)}
                      </div>
                    </div>
                    
                    </AccordionDetails>
              </Accordion>  
            </div>

            <div>
              <div className="options"> 
                  <div className="head">
                      <Link to="../"> Your Progress</Link> 
                  </div>
                  {marks && <div className="head" >
                      <div style={{color: "#ef5252"}}>Marks Obtained: {marks}</div> 
                  </div>}
              </div>

              <Paper style={{height: 400, overflow: 'auto',padding: "20px"}}>
                  <Grid container spacing={3}>
                      <Grid item xs={12}> 
                          <div >
                              Type your answer in the provided Text box only :
                          </div>
                          </Grid>
                            <Grid item xs={12}> 
                              <div className="ques">
                                <TextField
                                  required
                                  id="answer"
                                  name="Answer"
                                  label="Answer"
                                  multiline
                                  rows={11}
                                  fullWidth
                                  onChange={ e => setAnswer(e.target.value)}
                                />
                              </div>
                          </Grid>
                          <div className="alerts" style={{width : "100%"}}>
                            <div>
                                {error && <div className="error">{error}</div> }
                            </div>
                            <div >
                                {success && <div className="success">{success}</div> }
                            </div>
                        </div>
                      <div className="update" style={{margin:"0px",width:"100%" , background:"white", justifyContent:"center"}}>
                      <div className="objects" >
                        <input 
                            style={{width:"180px" , justifyContent:"center"}}
                            type="button"
                            value={`${done ?'Submitted': 'Submit'}`}
                            className={`${done ?'disable': 'saveForm'}`} 
                            disabled={done}
                            onClick={handleClick} />
                      </div>
                      </div>


                  </Grid>
                  
              </Paper>

            </div>
          </Container>
        </div>
    )
}

export default Submission;