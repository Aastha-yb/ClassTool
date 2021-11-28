import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import "../containers/Login"
import { getUser } from '../Utils/Common';
import axios from 'axios';
import "../styles/formDashboard.css"

export default function CreateGroupForm() {

  const [groupCode, setGroupCode] = useState('');
  const [courseName, setCourseName] = useState('');
  const [desc, setDesc] = useState('');
  const [error ,setError]=useState(null);
  const [success, setSuccess] = useState(null);

  const registerGroup = () => {
    axios({
        method: "post",
        data: {
          groupCode : groupCode,
          courseName : courseName,
          desc : desc,
          teacherName: getUser().name,
          teacherEmail: getUser().email
        },
        withCredentials: true,
        url: `http://localhost:5000/teacher/addGroup`,
    })
    .then( res => {
      console.log(res)
      setError(null);
      setSuccess(`Group: ${courseName} successfully created!`)
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
      <Typography variant="h4" gutterBottom>
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="courseName"
            name="courseName"
            label="Course Name"
            fullWidth
            onChange={ e => setCourseName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="groupCode"
            name="groupCode"
            label="Group Code (must be Unique)"
            fullWidth
            onChange={ e => setGroupCode(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="desc"
            name="desc"
            label="Course Description"
            multiline
            rows={4}
            fullWidth
            onChange={ e => setDesc(e.target.value)}
          />
        </Grid>
          {error && <div className="error">{error}</div> }
          {success && <div className="success">{success}</div> }
      </Grid>
      <div style={{alignContent: "center", textAlign: "center", padding:"20px"}}>
      <input 
        style={{backgroundColor: "#EF5252", borderRadius: "5px",color: "white"}}
        type="button"
        value = 'Create' 
        className='saveForm'
        onClick={registerGroup}/>
      </div>
    </React.Fragment>
  );
}