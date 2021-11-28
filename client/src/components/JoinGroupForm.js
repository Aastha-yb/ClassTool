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

export default function JoinGroupForm() {

  const [groupCode, setGroupCode] = useState('');
  const [courseName, setCourseName] = useState('');
  const [desc, setDesc] = useState('');
  const [error ,setError]=useState(null);
  const [success, setSuccess] = useState(null);

  const joinGroup = () => {
    axios({
        method: "post",
        data: {
          groupCode : groupCode,
          studentName: getUser().name,
          studentEmail: getUser().email
        },
        withCredentials: true,
        url: `http://localhost:5000/student/joinGroup`,
    })
    .then( res => {
      console.log(res)
      setError(null);
      setSuccess(`Successfully joined Group: ${courseName} !`)
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
            id="groupCode"
            name="groupCode"
            label="Group Code (must be Unique)"
            fullWidth
            onChange={ e => setGroupCode(e.target.value)}
          />
        </Grid>
          {error && <div className="error">{error}</div> }
          {success && <div className="success">{success}</div> }
      </Grid>
      <div style={{alignContent: "center", textAlign: "center", padding:"20px"}}>
      <input 
        style={{backgroundColor: "#EF5252", borderRadius: "5px",color: "white"}}
        type="button"
        value = 'Join' 
        className='saveForm'
        onClick={joinGroup}/>
      </div>
    </React.Fragment>
  );
}