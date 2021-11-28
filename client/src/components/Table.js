import React,{useState,useEffect} from 'react';
import { getToken ,getAssignments,setSubmission, formDate} from '../Utils/Common';
import axios    from 'axios';
import { useNavigate,Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import "../styles/table.css"
import NoData from './Nodata';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });
  


export function SubmissionTable(){

    const [subs,setSubs] = useState([])
    const navigate = useNavigate();
    const classes = useStyles();

    useEffect(() =>{
        if( !getToken())
            console.log("Nothing Authenticated")
        
        else{
            axios({
                method: "get",
                url: `http://localhost:5000/teacher/getSubmissions/${getAssignments()._id}`,
            }).then((res) => {
                setSubs(res.data)
            }).catch(err =>{
                if( err.response.status){
                    // Render an element here.says ("No Groups to show")
                    console.log("Nothing to show ")
                }
            })
        }
        

    },[])

    const goToDetails = (data) => {
        setSubmission(data);
        // console.log("thios")
        navigate(`${data.studentEmail}`)
    };



    return (
        <div>
            <div className="options"> 
                <div className="head">
                    <Link to=""> Submissions</Link> 
                </div>

            </div>
                       
            <div>
                <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Student Email</TableCell>
                        <TableCell align="right">Student Name</TableCell>
                        <TableCell align="right">Marks Obtained</TableCell>
                        <TableCell align="right">Submitted On</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {subs.map((sub) => (
                        <TableRow 
                        key={sub._id} 
                        className= "tableRow"
                        onClick={() => goToDetails(sub)}>
                        <TableCell component="th" scope="row">
                            {sub.studentEmail}
                        </TableCell>
                        <TableCell align="right">{sub.studentName}</TableCell>
                        <TableCell align="right">{sub.marksObtained || 'NA'} </TableCell>
                        <TableCell align="right">{formDate(sub.createdAt)}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
            </div>
            {subs.length ===0 && <NoData page={"Submissions"}/>} 
        </div>
    )
}