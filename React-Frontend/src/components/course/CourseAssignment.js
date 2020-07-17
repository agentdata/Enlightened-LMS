import React, { useState } from 'react';
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
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import http from '../../api/http';

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
  contentDiv: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "Space-between",
    padding: "20px"
  },
  submitDiv: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: "20px"
  },
  textInput: {
    width: "100%",
    height: "150px",
    minHeight: "150px"
  },
  bottomDivider: {
    marginBottom: "20px"
  }
}));

export default function CourseAssignment(props) {

  const classes = useStyles();
//   const isInstructor = sessionStorage.getItem("isInstructor")
  const isInstructor = true
  const assignmentClicked = props.assignmentClicked[0]

  const [submitOpen, setSubmitOpen] = useState(false);
  const [textInput, setTextInput] = useState("");

  const submitButtonPressed = () => {
    setSubmitOpen(true)
  }

  const submitTextInput = () => {
    let submission = {
      courseId: sessionStorage.getItem("courseId"),
      assignmentId: assignmentClicked.assignmentID,
      submission: textInput
    };

    http.submitAssignment(JSON.stringify(submission))
    .then( async (response) => {
      const body = await response.json();
      if (response.status === 200 && body["message"] === "Assignment Successfully Submitted") {
        props.closeModal();
      }
    })
    .catch((e) => {
      console.warn("There was an error submitting text submission: ", e);
    })
  }

  const submitFileUpload = () => {
    // file upload api
    let data = new FormData();
    let file = document.querySelector('input[type="file"]').files[0];
    // data.append('assignmentId', assignmentClicked.assignmentID)

    // Key needs to be 'file'
    data.append('file', file);

    console.log("file: " + data.get("file"));
    console.log("assignmentId: " + assignmentClicked.assignmentId);

    http.submitFileAssignment(assignmentClicked.assignmentId, data)
    .then( async (response) => {
      const body = await response.json();
      if (response.status == 200 && body["message"] === "Assignment Successfully Uploaded") {
        props.closeModal();
      }
    })
    .catch((e) => {
      console.warn("There was an error submitting file upload: ", e);
    })
    
  }

  const handleAssignmentSubmission = () => {
    if (assignmentClicked.submissionType === 'TEXTBOX') {
      // submit textInput
      submitTextInput();
    } else {
      // submit file upload
      submitFileUpload();
    }
  }

  const handleTextChange = (target) => { 
    setTextInput(target.currentTarget.value)
  }

  return (
    
    <div>
      <Button onClick={props.closeModal}>
        Cancel
      </Button>
      <div className={classes.contentDiv}>
        <Typography variant="h3">
          {assignmentClicked.title}
        </Typography>
      </div>
      <Divider />
      <div className={classes.contentDiv}>
        <Typography>
          Points Possible: {assignmentClicked.maxPoints}
        </Typography>
        <Typography>
          Due: {assignmentClicked.dueDate}
        </Typography>
        <Typography>
          {assignmentClicked.submissionType === "TEXTBOX" ? 'Submission Type: Text Input' : 'Submission Type: File Upload'}
        </Typography>
      </div>
      <Divider />
      <div className={classes.contentDiv}>
        <Typography>
          {assignmentClicked.description}
        </Typography>
      </div>
      <Divider />
      {submitOpen ? null : 
      <div className={classes.submitDiv}>
        <Button onClick={submitButtonPressed}>
          Submit Assignment
        </Button>
      </div>
      }
      <Divider className={classes.bottomDivider}/>
      {submitOpen ? 
      <div className={classes.submissionDiv}>
        {assignmentClicked.submissionType === "TEXTBOX" ?
          <div className={classes.textInput}>
            <TextareaAutosize className={classes.textInput}
              onChange={handleTextChange}>
              
            </TextareaAutosize>
          </div>
           :
          <div>
            <Button
              variant="contained"
              component="label"
            >
              Upload File
              <input
                type="file"
                style={{ display: "none" }}
              />
            </Button>
          </div>  
        }
          <div className={classes.submitDiv}>
            <Button onClick={handleAssignmentSubmission}>
              Submit
            </Button>
          </div>
      </div> : null }
    </div>
    
  );
}