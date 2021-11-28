import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import "../containers/Login"
import { getUser,getGroup } from '../Utils/Common';
import axios from 'axios';
import "../styles/formDashboard.css"
import "../styles/assignment.css"

export default function CreateAssignment() {

  const [comments, setComments] = useState('');
  const [maxMarks, setMaxMarks] = useState('');
  const [question, setQuestion] = useState('');
  const [topic, setTopic] = useState('');
  const [error ,setError]=useState(null);
  const [success, setSuccess] = useState(null);

  const createAssignment = () => {
    axios({
        method: "post",
        data: {
            topic : topic,
            question : question,
            maxMarks : maxMarks,
            comments : comments,
            groupId : getGroup(),
            teacherName: getUser().name,
            teacherEmail: getUser().email
        },
        withCredentials: true,
        url: `http://localhost:5000/teacher/addAssignment`,
    })
    .then( res => {
      console.log(res)
      setError(null);
      setSuccess(`Assignment : ${topic} successfully created!`)
    })
    .catch(err => {
      console.log("Error", err)
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
    <React.Fragment>
        <div className="box">
            <Grid container spacing={3}>
                <Grid item xs={12}>
                <TextField
                    required
                    id="heading"
                    name="Assignment's Topic"
                    label="Assignment's Topic"
                    fullWidth
                    onChange={ e => setTopic(e.target.value)}
                />
                </Grid>
                
                <Grid item xs={12}> 
                <TextField
                    required
                    id="Maximum Marks"
                    name="Maximum Marks"
                    label="Maximum Marks"
                    type="number"
                    fullWidth
                    onChange={ e => setMaxMarks(e.target.value)}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    required
                    id="question"
                    name="Question"
                    label="Question"
                    multiline
                    rows={6}
                    fullWidth
                    onChange={ e => setQuestion(e.target.value)}
                />
                </Grid>
                <Grid item xs={12}> 
                <TextField
                    id="comments"
                    name="Other Instructions/Comments"
                    label="Other Instructions/Comments"
                    multiline
                    rows={2}
                    fullWidth
                    onChange={ e => setComments(e.target.value)}
                />
                </Grid>
                {error && <div className="error">{error}</div> }
                {success && <div className="success">{success}</div> }
            </Grid>
            <div style={{alignContent: "center", textAlign: "center", padding:"20px"}}>
            <input 
                style={{backgroundColor: "#EF5252", borderRadius: "5px",color: "white", width: "30%"}}
                type="button"
                value = 'Add Assignment' 
                className='saveForm'
                onClick={createAssignment}/>
            </div>
        </div>
    </React.Fragment>
  );
}