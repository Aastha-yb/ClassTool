import React, { useState } from 'react';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import "../styles/submission.css"
import { getSubmission ,getAssignments,formDate } from '../Utils/Common';
import { Link } from 'react-router-dom';
import axios from 'axios'

export default function SubmissionCard() {

    const[marks, setMarks] = useState();
    const[error, setError] = useState();
    const[success, setSuccess] = useState();

    const updateMarks = () => {

        if( !marks){
            setSuccess(null)
            setError(`No value entered!`)
        }
        else if( marks > getAssignments().maxMarks){
            setSuccess(null)
            setError(`Invalid Value! `)
        }
        else{
            axios({
                method: "post",
                data: {
                marksObtained : marks
                },
                withCredentials: true,
                url: `http://localhost:5000/teacher/updateMarks/${getSubmission()._id}`,
            })
            .then( res => {
            console.log(res)
            setError(null);
            setSuccess(`Marks Updated Successfully`)
            })
            .catch(err => {
            console.log("Error", err)
            if(err.response.status === 400){
                setSuccess(null);
                setError(err.response.data.message)
            }
            else{
                setSuccess(null);
                setError("Something went wrong.Please try again later")
            }
            })
        }
      } 


    return (
        <div>
        <div className="options"> 
            <div className="head">
                <Link to="../"> Submissions</Link> 
                {' '}/{' '}
                <Link to="/"> {getSubmission().studentEmail}</Link> 
            </div>

        </div>
        <Paper style={{height: 350, overflow: 'auto',padding: "20px"}}>
            <Grid container spacing={1} className="subCard">
                <Grid item xs={12} >
                    <div>
                    <div className="tag"> Answer </div> 
                    <div className="ans"> {getSubmission().answer} </div>
                    </div>
                </Grid>

                <Grid item xs={6}>
                    <div >
                        <div className="tag">  Sub Details</div>
                        <div className="subDeets">
                            <span className='banner'> Student Name : </span> {getSubmission().studentName}
                            <br></br>
                            <span className='banner'> Student Email : </span> {getSubmission().studentEmail}
                            <br></br>
                            <span className='banner'> Submission Time : </span>{formDate(getSubmission().createdAt)}
                            <br></br>
                        </div>
                    </div>
                </Grid>  
            </Grid>
        </Paper>
        <div className="alerts">
            <div>
                {error && <div className="error">{error}</div> }
            </div>
            <div >
                {success && <div className="success">{success}</div> }
            </div>
        </div>
        <div className="update">
            
            <div className="objects">
                Update Marks: {' '}
                <input 
                type="number"
                style={{color :"black"}}
                placeholder={getSubmission().marksObtained || "Enter marks"}
                onChange={e => setMarks(e.target.value)}></input>
                {' '}/ {' '} {getAssignments().maxMarks}
            </div>
            <div className="objects">
            <input 
                type="button"
                value="Update"
                className='saveForm' 
                onClick={updateMarks}/>
            </div>
        </div>
            
        </div>

    )
}