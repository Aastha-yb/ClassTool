import React ,{useState,useEffect} from 'react';
import { getToken ,getAssignments,setSubmission, getGroup,getUser, formDate} from '../Utils/Common';
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
import NoData from './Nodata';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

export default function ListStudents(){

    const userType = (getUser().role == "Teacher") ? "teacher" : "student"
    const [subs,setSubs] = useState([])
    const navigate = useNavigate();
    const classes = useStyles();

    useEffect(() =>{
        if( !getToken())
            console.log("Nothing Authenticated")
        
        else if( userType === "student"){
            axios({
                method: "get",
                url: `http://localhost:5000/${userType}/getStudents/${getGroup().groupId._id}`,
            }).then((res) => {
                setSubs(res.data)
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
                url: `http://localhost:5000/${userType}/getStudents/${getGroup()._id}`,
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

    var i = 1;

    return (
        <div>

        <TableContainer component={Paper} style={{margin:"20px 0px"}}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Sr no.</TableCell>
                    <TableCell align="right">Student Email</TableCell>
                    <TableCell align="right">Student Name</TableCell>
                    <TableCell align="right">Joined On</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {subs.map((sub) => (
                    <TableRow 
                    key={sub._id} 
                    className= "tableRow">
                    <TableCell component="th" scope="row">
                        {i++}
                    </TableCell>
                    <TableCell align="right">{sub.studentName}</TableCell>
                    <TableCell align="right">{sub.studentEmail}</TableCell>
                    <TableCell align="right">{formDate(sub.createdAt)}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
        {subs.length ===0 && <NoData page={"Students"}/>}

        </div>
    )
}