import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import Modal from '@material-ui/core/Modal'
import AddAssignment from './AddAssignment'
import CourseAssignment from './CourseAssignment'
import { Link } from 'react-router-dom'
import http from '../../api/http';
import utilities from "../../actions/utilities";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginBottom: '20px',
    paddingBottom : "0px",
    backgroundColor: theme.palette.background.paper,
  },
  modal: {
    overflow: "scroll"
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
  flexHorizontal: {
    display: "flex",
    justifyContent: "space-between"
  },
  gradeButton: {
    margin: "15px",
    color: "#3f51b5",
    textDecoration: "underline",
    minWidth: "180px",
    height: "42px"
  }
}));

export default function CourseAssignments(props) {

  const isInstructor = sessionStorage.getItem("isInstructor") === "true" ? true : false
  const courseId = sessionStorage.getItem("courseId")

  const [pastAssignments, setPastAssignments] = React.useState()
  const [upcomingAssignments, setUpcomingAssignments] = React.useState()

  const classes = useStyles();
  const [assignmentListOpen, setAssignmentListOpen] = React.useState(true);
  const [pastAssignmentListOpen, setPastAssignmentListOpen] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false)

  const [assignmentModalOpen, setAssignmentModalOpen] = React.useState(false);
  const [assignmentClicked, setAssignmentClicked] = React.useState({assignmentID: -1});
  
  useEffect(() => {
    if (assignmentClicked.assignmentID !== -1) {
      setAssignmentModalOpen(true);
    }

    //Check if either assignment array is null then fetch data
    if(!upcomingAssignments && !pastAssignments){
      var fetchedPastAssignments = []
      var fetchedFutureAssignments = []
      http.getCourseAssignmentsWithDetails(sessionStorage.getItem("courseId"))
      .then( async(response) => {
        var body = await response.json();
        if(response.status === 200 && body["message"] === "Success"){
          for (let i in body["assignments"]) {
            let assignment = {
              title: body["assignments"][i]["title"],
              description: body["assignments"][i]["description"],
              maxPoints: body["assignments"][i]["maxPoints"],
              dueDate: body["assignments"][i]["dueDate"],
              assignmentID: body["assignments"][i]["id"],
              submissionType: body["assignments"][i]["submissionType"],
              submitted: false,
            }
            if(body["assignments"][i]["submissions"] !== null){
              assignment.submitted = true
              assignment.graded = body["assignments"][i]["submissions"]["graded"]
              if(body["assignments"][i]["submissions"]["pointsAwarded"] !== null){
                assignment.pointsAwarded = body["assignments"][i]["submissions"]["pointsAwarded"]
              }
              assignment.Submission = body["assignments"][i]["submissions"]
            }
            
            if(new Date(Date.parse(assignment["dueDate"])).getTime() < new Date().getTime()){
              fetchedPastAssignments.push(assignment)
              if(body.assignments[i].id === props.match.params.assignmentid){
                handleAssignmentClick(props.match.params.assignmentid, body.assignments[i])
              }
            }else{
              if(body.assignments[i].id === props.match.params.assignmentid){
                handlePastAssignmentClick(props.match.params.assignmentid, body.assignments[i])
              }
              fetchedFutureAssignments.push(assignment)
            }
          }  
          setUpcomingAssignments(fetchedFutureAssignments)
          setPastAssignments(fetchedPastAssignments)
        }
      })
      .catch((e) => {
          console.warn("There was an error retrieving instructor courses: ", e);
      });
    } 
  }, [assignmentClicked])

  const handleAssignmentHeadClick = () => {
    setAssignmentListOpen(!assignmentListOpen);
  };

  const handlePastAssignmentHeadClick = () => {
    setPastAssignmentListOpen(!pastAssignmentListOpen);
  };

  const handleAddAssignment = () => {
      setModalOpen(true)
  }

  const handleClose = () => {
    setModalOpen(false)
  }

  const handleAssignmentClick = (key, assignmentFromUrl) => {
    if(assignmentFromUrl){
      setAssignmentClicked([assignmentFromUrl])
    }else{
      setAssignmentClicked(upcomingAssignments.filter(obj => obj.assignmentID === key))
    }
  }

  const handlePastAssignmentClick = (key, assignmentFromUrl) => {
    if(assignmentFromUrl){
      setAssignmentClicked([assignmentFromUrl])
    }else{
      setAssignmentClicked(pastAssignments.filter(obj => obj.assignmentID === key))
    }
  }

  const handleAssignmentClose = () => {
    setAssignmentModalOpen(false)
    setAssignmentClicked({assignmentID: -1})
    if(props.match.params.assignmentid){
      props.history.push(`/course/${sessionStorage.getItem("courseId")}/course-assignments`);
    }
  }


  return (
    <div className={classes.assignmentsDiv}>

      <Modal
        className={classes.modal}
        disableBackdropClick
        open={assignmentModalOpen}
        onClose={handleAssignmentClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        >
          <div className={classes.paper}>
            <CourseAssignment closeModal = {handleAssignmentClose} assignmentClicked = {assignmentClicked}/>
          </div>
        </Modal>
        {isInstructor ?
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
        <ListItem button onClick={handleAssignmentHeadClick} key="assignmentHead">
            <ListItemIcon>
            <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Upcoming Assignments" />
            {assignmentListOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={assignmentListOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>

            {upcomingAssignments &&
            upcomingAssignments.map(currentAssignment => (
                <div key={currentAssignment.assignmentID}>
                  <div className={classes.flexHorizontal}>
                    <ListItem button className={classes.nested} onClick={() => handleAssignmentClick(currentAssignment.assignmentID)}>
                        <ListItemText primary={currentAssignment.title} 
                        secondary={" Due: " + utilities.formatDateTime(currentAssignment.dueDate) + " | " + currentAssignment.maxPoints + " pts"}  />
                    </ListItem>
                    {isInstructor ? 
                      <Button component={Link} to={`/course/${courseId}/grade-assignments/${currentAssignment.assignmentID}`} className={classes.gradeButton}>
                        Grade Submissions
                      </Button> : null }
                  </div>
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
        <ListItem button onClick={handlePastAssignmentHeadClick} key="pastAssignmentHead">
            <ListItemIcon>
            <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Past Assignments" />
            {pastAssignmentListOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={pastAssignmentListOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
            {pastAssignments &&
            pastAssignments.map(currentAssignment => (
                <div key={currentAssignment.assignmentID}>
                  <div className={classes.flexHorizontal}>
                    <ListItem button className={classes.nested} onClick={() => handlePastAssignmentClick(currentAssignment.assignmentID)}>
                        <ListItemText primary={currentAssignment.title} 
                        secondary={" Due: " + utilities.formatDateTime(currentAssignment.dueDate) + " | " + currentAssignment.maxPoints + " pts"}  />
                    </ListItem>
                    {isInstructor ? 
                      <Button component={Link} to={`/course/${courseId}/grade-assignments/${currentAssignment.assignmentID}`} className={classes.gradeButton}>
                        Grade Submissions
                      </Button> : null }
                    <Divider />
                    </div>
                </div>
            ))}
            </List>
        </Collapse>
        </List>
    </div>

    
  );
}