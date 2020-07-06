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
import Button from '@material-ui/core/Button'
import Modal from '@material-ui/core/Modal'
import AddAssignment from './AddAssignment'

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
  },
  addAssignmentBtn: {
      backgroundColor: "white",
      marginBottom: "10px",
      color: "#f44336"
  },
  paper: {
    position: 'relative',
    maxWidth: 800,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    margin: "auto",
    top: "100px"
  },
}));

export default function CourseAssignments(props) {

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
//   const isInstructor = sessionStorage.getItem("isInstructor")
  const [modalOpen, setModalOpen] = React.useState(false)
  const isInstructor = true


  const handleAssignmentClick = () => {
    setAssignmentOpen(!assignmentOpen);
  };

  const handlePastAssignmentClick = () => {
    setPastAssignmentOpen(!pastAssignmentOpen);
    console.log(isInstructor)
  };

  const handleAddAssignment = () => {
      setModalOpen(true)
  }

  const handleClose = () => {
    setModalOpen(false)
}

  return (
    <div className={classes.assignmentsDiv}>
        {isInstructor === true ?
            <div>
                <Button className={classes.addAssignmentBtn} onClick={handleAddAssignment}>+ Add New Assignment</Button>
                <Modal
                        className={classes.modal}
                        disableBackdropClick
                        open={modalOpen}
                        onClose={handleClose}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                    >
                    
                <div className = {classes.paper}>
                    <AddAssignment closeModal = {handleClose}/>
                </div>
                </Modal>
            </div>
            : null}
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