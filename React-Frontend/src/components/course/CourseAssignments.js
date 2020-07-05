import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import Divider from '@material-ui/core/Divider'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginBottom: '20px',
    paddingBottom : "0px",
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  assignmentsDiv: {
      width: '100%',
      margin: '20px'
  },
  listItemRight: {
      textAlign: "right",
      paddingRight: "10px"
  }
}));

export default function CourseAssignments() {

  const [pastAssignments, setPastAssignments] = React.useState([
    {
        title: "Assignment 1",
        points: 100,
        dueDate: "6/30/2020 11:59 PM"
    },
    {
        title: "Assignment 2",
        points: 150,
        dueDate: "7/1/2020 11:59 PM"
    }
])

  const [upcomingAssignments, setUpcomingAssignments] = React.useState([
    {
        title: "Assignment 3",
        points: 100,
        dueDate: "7/7/2020 11:59 PM"
    },
    {
        title: "Assignment 4",
        points: 150,
        dueDate: "7/8/2020 11:59 PM"
    }
  ])
  const classes = useStyles();
  const [assignmentOpen, setAssignmentOpen] = React.useState(true);
  const [pastAssignmentOpen, setPastAssignmentOpen] = React.useState(true);

  const handleAssignmentClick = () => {
    setAssignmentOpen(!assignmentOpen);
  };

  const handlePastAssignmentClick = () => {
    setPastAssignmentOpen(!pastAssignmentOpen);
  };

  return (
    <div className={classes.assignmentsDiv}>
        <List
        component="nav"
        className={classes.root}
        >
        <ListItem button onClick={handleAssignmentClick}>
            <ListItemIcon>
            <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Upcoming Assignments" />
            {assignmentOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={assignmentOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>

            {upcomingAssignments.map(currentAssignment => (
                <div>
                    <ListItem button className={classes.nested}>
                        <ListItemText primary={currentAssignment.title} 
                        secondary={" Due: " + currentAssignment.dueDate + " | " + currentAssignment.points + " pts"}  />
                    </ListItem>
                    <Divider />
                </div>
                
            ))}
            </List>
        </Collapse>
        </List>

        <List
      component="nav"
      className={classes.root}
        >
        <ListItem button onClick={handlePastAssignmentClick}>
            <ListItemIcon>
            <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Past Assignments" />
            {pastAssignmentOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={pastAssignmentOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
            {pastAssignments.map(currentAssignment => (
                <div>
                    <ListItem button className={classes.nested}>
                        <ListItemText primary={currentAssignment.title} 
                        secondary={" Due: " + currentAssignment.dueDate + " | " + currentAssignment.points + " pts"}  />
                    </ListItem>
                    <Divider />
                </div>
            ))}
            </List>
        </Collapse>
        </List>
    </div>

    
  );
}