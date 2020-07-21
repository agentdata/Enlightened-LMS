import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles"
import { Typography, Button, List, ListItem, 
        TextField, Divider, Link} from '@material-ui/core';
import http from '../../api/http';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = theme => ({
    verticalFlex: {
        display: "flex",
        flexDirection: "column",
        color: "rgba(0, 0, 0, 0.54);"
    },
    horizontalFlex: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    title: {
        display: "flex",
        flexDirection: "column",
        paddingTop: "10px",
        textAlign: "center",
        color: "#3f51b5",
        borderBottom: "2px solid #3f51b5",
        marginBottom: "10px"
    },
    buttons: {
        display: "flex",
        justifyContent: "space-around"
    },
    modalButton: {
        paddingRight: "12px",
        paddingLeft: "12px"
    },
    assignmentDetails: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    },
    submission: {
        minHeight: "100px",
        color: "black",
        paddingTop: "15px",
        paddingBottom: "15px"
    },
    gradeContainer: {
        display: "flex",
        justifyContent: "flex-end"
    },
    gradeDiv: {
        display: "flex",
        alignItems: "baseline"
    },
    textField: {
        width: "200px",
    },
    resize: {
        fontSize: "45px"
    }
})

class GradeAssignmentModal extends Component {

    constructor(props) {
        super(props)

        this.state = {
            pointsAwarded: -1,
            pointsAwardedError: '',
            confirmDialogOpen: false
        };
    }
    

    getLoggedIn = async () => {
        // check if user logged in, set state accordingly
    }

    componentDidMount() {
        this.getLoggedIn();
    }

    handlePointsAwardedChange = (target) => {
        this.setState({pointsAwarded: target.currentTarget.value})
    }

    validatePointsAwarded = () => {
        if (this.state.pointsAwarded === -1) {
            this.setState({pointsAwardedError: 'Cannot Be Empty'})
        } else if (!/^\d+$/.test(this.state.pointsAwarded)) {
            this.setState({pointsAwardedError: 'Numbers Only'})
        } else {
            this.setState({pointsAwardedError: ''})
        }
    }

    handleDialogOpen = () => {
        this.setState({confirmDialogOpen: true})
    }

    handleDialogClose = () => {
        this.setState({confirmDialogOpen: false})
        this.props.closeModal();
    }

    // grade submission api call
    gradeAssignment() {

        // student id stored in this.props.studentId
        // assignment id stored in this.props.assignmentId
        // grade stored in this.state.pointsAwarded

        let grade = {
            assignmentId: this.props.assignmentId,
            studentId: this.state.studentId,
            grade: this.state.pointsAwarded
        }
        http.updateAssignmentGrade(JSON.stringify(grade))
        .then( async (response) => {
            const data = await response.json()
            if (response.status === 200 && data["message"] === "Assignment graded successfully.") {
                // UI trigger message indicating grade saved
            }
        })
        .catch((e) => {
            console.warn("There was an error grading the assignment: ", e)
        });

        this.setState({
            graded: this.state.graded + 1,
        })
    }

    downloadFileSubmission = () => {
        // download file
        console.log("download")
    }

    render() {
        const { classes } = this.props

        return (
            <div className={classes.verticalFlex}>
                <div className={classes.title}>
                    <Typography variant="h5">Grade Assignment</Typography>
                </div>
                <div className={classes.assignmentDetails}>
                    <Typography>Student Name: {this.props.studentName}</Typography>
                    <Typography>Assignment ID: {this.props.assignmentId}</Typography>
                </div>
                <Divider />
                <div className={classes.submission}>
                    {this.props.submissionType === "TEXTBOX" ? 
                    <Typography>{this.props.textSubmission}</Typography> :
                    <Link onClick={this.downloadFileSubmission}>{this.props.fileSubmissionName}</Link>
                    }
                </div>
                <Divider />
                <div className={classes.gradeContainer}>
                    <div className={classes.gradeDiv}>
                        <TextField
                        id="pointsAwarded"
                        label="Points"
                        helperText={this.state.pointsAwardedError === '' ? "" : this.state.pointsAwardedError}
                        margin="normal"
                        InputLabelProps={{
                            shrink: true
                        }}
                        InputProps={{
                            classes: {
                                input: classes.resize
                            }
                        }}
                        className={classes.textField}
                        onChange={this.handlePointsAwardedChange}
                        onBlur={this.validatePointsAwarded}
                        error={this.state.pointsAwardedError === '' ? false : true}
                        />
                        <Typography variant="h3"> / {this.props.pointsPossible} </Typography>
                    </div>
                </div>

                <List>
                    <ListItem className={classes.buttons}>
                        <Button className={classes.modalButton} onClick={this.props.closeModal}>Cancel</Button>
                        <Button className={classes.modalButton} onClick={this.checkErrors}>Submit Grade</Button>
                    </ListItem>
                </List>

                <Dialog
                    open={this.state.confirmDialogOpen}
                    onClose={this.handleDialogClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Success"}</DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Assignment Successfully Graded.
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={this.handleDialogClose} color="primary" autoFocus>
                        Nice!
                    </Button>
                    </DialogActions>
                </Dialog>
            </div>
            
        );
    }
}

export default withStyles(styles)(GradeAssignmentModal);
