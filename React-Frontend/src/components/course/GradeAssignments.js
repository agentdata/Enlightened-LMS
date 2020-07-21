import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles"
import { Typography, List, ListItem, 
        ListItemText, Button, Link, Divider, Modal } from '@material-ui/core';
import http from '../../api/http';
import GradeAssignmentModal from './GradeAssignmentModal'

const styles = theme => ({
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
    mainContainer: {
        width: "100%",
        margin: "25px"
    },
    head: {
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        paddingBottom: "10px",
        borderBottom: "3px solid black",
        flexWrap: "wrap",
        textAlign: "left"
    },
    numGraded: {
        display: "flex",
        flexDirection: "column",
        textAlign: "right"
    },
    graded: {
        color: "green",
    },
    notGraded: {
        color: "red"
    },
    listDiv: {
        backgroundColor: "white",
        marginTop: "20px",
        border: "1px solid #757575"
    }
})

class GradeAssignments extends Component {

    constructor(props) {
        super(props)

        this.state = {
            assignmentId: 1008,
            submissions: 0,
            graded: 0,
            submissionType: "FILEUPLOAD",
            maxPoints: 150,
            assignmentSubmissions: [/*{
                studentId: 12345,
                studentName: "Justin Edwards",
                submittedTimestamp: "2020-07-15T22:17:41.714+00:00",
                onTime: true,
                isGraded: false,
                pointsAwarded: 0
            },
            {
                studentId: 123456,
                studentName: "Kali Winn",
                submittedTimestamp: "2020-07-15T22:17:41.714+00:00",
                onTime: true,
                isGraded: true,
                pointsAwarded: 145
            },
            {
                studentId: 1234567,
                studentName: "Zak Jones",
                submittedTimestamp: "2020-07-15T22:17:41.714+00:00",
                onTime: false,
                isGraded: true,
                pointsAwarded: 130
            }*/],
            currentStudentId: null,
            currentStudentName: null,
            modalOpen: false,

            // store text submission here
            textSubmission: null,
            fileSubmissionName: null
        }
    }

    // load submissions
    componentDidMount() {
        // set assignmentSubmissions state here
        this.getAssignmentSubmissions();

        this.setState({
            submissions: this.state.assignmentSubmissions.length
        });
        
    }

    handleGradeAssignment = (studentId, studentName) => {
        this.setState({currentStudentId: studentId, currentStudentName: studentName}, () => {
            this.getAssignmentSubmission()
        }) 
    }

    // API call - get assignment data
    getAssignment = () => {
        http.getCourseAssignment()
        .then( async (response) => {
            const data = await response.json();
            if (response.status === 200 && data["message"] === "success") {
                console.log(data)
                this.setState({
                    assignmentId: data["id"],
                    submissionType: data["submissionType"],
                    maxPoints: data["maxPoints"],
                })
            }
        })
    }

    // API call - grab submissions from single assignment
    getAssignmentSubmissions = () => {
        // console.log(this.state.assignmentId)
        // http.getAssignmentSubmissions(this.state.assignmentId)
        // .then( async (response) => {
        //     const data = await response.json();
        //     if (response.status === 200 && data["message"] === "success") {
        //         console.log(data)
        //         for (let submission of data["submissions"]) {
        //             this.setState({
        //                 assignmentSubmissions: [...this.state.assignmentSubmissions, submission]
        //             });
        //             if (submission.isGraded === true) {
        //                 this.setState({
        //                     graded: this.state.graded + 1
        //                 })
        //             }
        //         }
        //     }
        // })
        // .catch((e) => {
        //     console.warn("There was an error retrieving submissions: ", e);
        // })
    }

    getAssignmentSubmission = () => {

        if (this.state.submissionType == "TEXTBOX") {
            // get submission and store it in textSubmission then open modal

            

            this.setState({textSubmission: "the quick brown fox jumped over the lazy dog"}, () => {
                this.setState({modalOpen: true})
            })
            
        } else {
            // get file name and store it in fileSubmissionName then open modal
            this.setState({fileSubmissionName: "fileupload.txt"}, () => {
                this.setState({modalOpen: true})
            })
        }
        
        
    }

    handleClose = () => {
        this.setState({modalOpen: false})
    }

    render() {

        const { classes } = this.props
        return (
            <div className={classes.mainContainer}>
                <div className={classes.head}>
                    <Typography variant="h2">Assignment Name</Typography>
                    <div className={classes.numGraded}>
                        <Typography variant="h5">Submissions: 17</Typography>
                        <Typography variant="h5">Graded: 0</Typography>
                    </div>
                </div>

                <div className={classes.listDiv}>
                    <List component="nav" disablePadding>
                        {this.state.assignmentSubmissions.map(currentSubmission => (
                            <div key={currentSubmission.studentId} onClick={() => this.handleGradeAssignment(currentSubmission.studentId, currentSubmission.studentName)}>
                                <div className={classes.flexHorizontal}>
                                    <ListItem button className={classes.nested} /*onClick={() => handleSubmissionClick()}*/>
                                        <ListItemText primary={currentSubmission.studentName} 
                                        secondary={" Submitted: " + currentSubmission.submittedTimestamp}  />
                                        <Typography className={currentSubmission.isGraded ? classes.graded : classes.notGraded}>{currentSubmission.isGraded ? "Graded: " + currentSubmission.pointsAwarded + "/" + this.state.maxPoints : "Not Yet Graded"}</Typography>
                                    </ListItem>
                                </div>
                            <Divider />
                            </div>
                        ))}
                    </List>
                </div>
                <div>
                    <Modal
                    className={classes.modal}
                    disableBackdropClick
                    open={this.state.modalOpen}
                    onClose={this.handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                        >
                        
                    <div className = {classes.paper}>
                        <GradeAssignmentModal closeModal={this.handleClose} studentId={this.state.currentStudentId} 
                        assignmentId={this.state.assignmentId} submissionType={this.state.submissionType} 
                        pointsPossible={this.state.maxPoints} studentName={this.state.currentStudentName} 
                        textSubmission={this.state.textSubmission} fileSubmissionName={this.state.fileSubmissionName}/>
                    </div>
                    </Modal>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(GradeAssignments)