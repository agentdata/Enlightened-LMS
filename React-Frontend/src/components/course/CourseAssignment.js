import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import http from '../../api/http';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import utilities from "../../actions/utilities";
import { Link } from 'react-router-dom';
import StudentGradesChart from '../charts/StudentGradesChart';

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

// These are the allowed file extensions
const allowedFileExtensions = ['pdf', 'docx', 'png', 'jpg', 'zip'];

export default function CourseAssignment(props) {

  const classes = useStyles();
  const isInstructor = sessionStorage.getItem("isInstructor") === "true" ? true : false
  // const isInstructor = true
  const assignmentClicked = props.assignmentClicked[0]

  const [submitOpen, setSubmitOpen] = useState(false);
  const [textInput, setTextInput] = useState("");

  const [fileName, setFileName] = useState("")

  const [confirmDialogOpen, setConfirmDialogOpen] = React.useState(false)

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
        handleDialogOpen();
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

    // Key needs to be 'file'
    data.append('file', file);

    http.submitFileAssignment(assignmentClicked.assignmentID, data)
    .then( async (response) => {
      const body = await response.json();
      if (response.status == 200 && body["message"] === "Assignment Successfully Uploaded") {
        handleDialogOpen();
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

  const handleSaveFileSubmission = () => {
    utilities.downloadFileSubmission(assignmentClicked.Submission.submittedFile.fileDownloadUrl, "save", assignmentClicked.Submission.submittedFile.fileName)
  }
  const handleOpenFileSubmission = () => {
    utilities.downloadFileSubmission(assignmentClicked.Submission.submittedFile.fileDownloadUrl, "open", assignmentClicked.Submission.submittedFile.fileName)
  }

  const handleTextChange = (target) => { 
    setTextInput(target.currentTarget.value)
  }

  const handleDialogOpen = () => {
    setConfirmDialogOpen(true);
  }

  const handleDialogClose = () => {
    setConfirmDialogOpen(false)
    props.closeModal();
  }

  const updateFileLabel = (e) => {
    if (e.target.files.length > 0) {
      // Check file extension
      let extension = e.target.files[0].name.split(".")
      let fileAccepted = false;

      for(let i = 0; i < allowedFileExtensions.length; i++){
        if(allowedFileExtensions[i] === extension[extension.length - 1].toLowerCase())
          fileAccepted = true;
      }

      if(fileAccepted)
        setFileName(e.target.files[0].name)
      else{
        // File is not accepted
        alert(extension[extension.length - 1].toUpperCase() + " is not a valid file type")
      }
    }
  }

  return (
    
    <div>
      <Button onClick={props.closeModal}>
        Close
      </Button>
      <div className={classes.contentDiv}>
        <Typography variant="h3">
          {assignmentClicked.title}
        </Typography>
      </div>
      <Divider />
      <div className={classes.contentDiv}>
        <div>
          { 
            assignmentClicked.graded ? (
            <div>
              Graded: {assignmentClicked.pointsAwarded} out of {assignmentClicked.maxPoints}
              <StudentGradesChart></StudentGradesChart>
            </div>
            ):
            <div>Points Possible: {assignmentClicked.maxPoints}</div>

          }
        </div>
        <Typography>
          Due: {utilities.formatDateTime(assignmentClicked.dueDate)}
        </Typography>
        <Typography>
          {assignmentClicked.submissionType === "TEXTBOX" ? 'Submission Type: Text Input' : 'Submission Type: File Upload'}
        </Typography>
      </div>
      <Divider />
      <div className={classes.contentDiv}>
        <Typography>
          Description: {assignmentClicked.description}
        </Typography>
      </div>
      
      {sessionStorage.getItem("isInstructor") === "true" ?
        null
        :
        <div>
        {
          assignmentClicked.submitted ?
          <div><Divider />
          <div className={classes.contentDiv}>
            <Typography>
                {assignmentClicked.submissionType === "TEXTBOX" ?
                  <div>
                    Your text Submission: {assignmentClicked.Submission.submissionContent}
                  </div>
                  :
                  <div>
                    Your file Submission: {assignmentClicked.studentId}
                    {" "}<button backgroundColor="gray"><Link onClick={handleOpenFileSubmission}> open </Link></button>
                    {" "}-or-{" "}
                    <button backgroundColor="gray"><Link onClick={handleSaveFileSubmission}> save </Link></button>
                  </div>
                }
            </Typography>
          </div>
          </div>
          : 
          null
        }
        
        <Divider />
        {
          submitOpen ? null : 
          <div className={classes.submitDiv}>
            {assignmentClicked.submitted ? 
            <Button disabled={true}>
              Already Submitted
            </Button>
            :
            <Button onClick={submitButtonPressed}>
              Submit Assignment
            </Button>}
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
                    id="file"
                    type="file"
                    style={{ display: "none" }}
                    onChange={updateFileLabel}
                  />
                </Button>
                <label htmlFor="file">{fileName}</label>
              </div>  
            }
              <div className={classes.submitDiv}>
                <Button onClick={handleAssignmentSubmission}>
                  Submit
                </Button>
              </div>
          </div> : null 
        }
      </div>}

      <Dialog
          open={confirmDialogOpen}
          onClose={handleDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Success"}</DialogTitle>
          <DialogContent>
          <DialogContentText id="alert-dialog-description">
              Assignment Submitted.
          </DialogContentText>
          </DialogContent>
          <DialogActions>
          <Button onClick={handleDialogClose} color="primary" autoFocus>
              Nice!
          </Button>
          </DialogActions>
        </Dialog>

    </div>
    
  );
}