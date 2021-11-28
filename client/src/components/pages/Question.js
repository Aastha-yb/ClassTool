import React, {useState} from 'react';
import { getAssignments, getGroup , getUser} from '../../Utils/Common';
import "../../styles/groups.css"
import "../../styles/assignment.css"
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import {Outlet, Link, useNavigate} from 'react-router-dom';
import Assignment from '../Assignments';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';

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

function Question(){

    const classes = useStyles();
    const [expanded, setExpanded] = React.useState('panel1');
    const navigate = useNavigate();
    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };


    return (
        <div className="group">
          <Container>
          <div className="heading">
            <Link to="../../"> {getUser().name}'s Groups </Link>
            {' '} / {' '}
            <Link to={`/dashboard/${getGroup().courseName}`} replace> {getGroup().courseName} </Link>
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
                        <span className="tag">Posted On :</span>{' '} { getAssignments().createdAt}
                      </div>
                    </div>
                    
                    </AccordionDetails>
                </Accordion>  
            </div>

            <Outlet/>
          </Container>
        </div>
    )
}

export default Question;