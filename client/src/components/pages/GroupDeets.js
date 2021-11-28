import React, {useState} from 'react';
import { getGroup , getUser} from '../../Utils/Common';
import "../../styles/groups.css"
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import {Outlet, Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CreateAssignment from '../CreateAssigment';
import Assignment from '../Assignments';
import ListStudents from '../ListStudents';
import Details from '../Details';

const Panel = (props) =>{
  return(
  <div hidden={props.value !== props.index}> 
    {props.value === props.index && <div>{ props.children}</div> }
  </div>
  )
}
function GroupDeets(){

  const[index,setIndex] = useState(0);

  const onTabClicked = (event,index) => {
    setIndex(index);
  }
    return (
        <div className="group">
          <Container>
          <div className="heading">
            <Link to="../" > {getUser().name}'s Groups </Link>
            {' '} / {' '}
            {getUser().role === "Teacher" && <Link to=""> {getGroup().courseName} </Link>}
            {!(getUser().role === "Teacher") && <Link to=""> {getGroup().groupId.courseName} </Link>}
          </div> 
                    
            <Tabs className="tab" value={index} onChange={onTabClicked}
              variant="fullWidth"
              centered
              aria-label= "full width tabs example">
              <Tab label='Assignments'/>
              <Tab label='Students'/>
              <Tab label='Details' />
              {(getUser().role ==="Teacher" ) && <Tab label='Create an Assignment'/>}

            </Tabs>

            <Panel value={index} index={0}>
              <Assignment/>
            </Panel>            
            <Panel value={index} index={1}>
              <ListStudents/>
            </Panel>
            <Panel value={index} index={2}>
              <Details />
            </Panel>
            {(getUser().role ==="Teacher" ) &&<Panel value={index} index={3}>
              < CreateAssignment/>
            </Panel>}
          </Container>
        </div>
    )
}

export default GroupDeets;