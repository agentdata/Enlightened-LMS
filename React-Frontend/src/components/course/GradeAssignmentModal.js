import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles"
import { Typography, Button, List, ListItem, 
        TextField } from '@material-ui/core';
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
    dayTitle: {
        padding: "8px"
    },
    submissionButton: {
        borderRadius: "3px",
        border: "1px solid rgba(0, 0, 0, 0.54)",
        minWidth: "50px",
        marginRight: "10px",
    },
    submissionSelected: {
        borderRadius: "3px",
        border: "1px solid rgba(0, 0, 0, 0.54)",
        backgroundColor: "#80e2a7",
        minWidth: "50px",
        '&:hover': {
            backgroundColor: "#57ad79"
        },
        marginRight: "10px"
    },
    daysFlex: {
        marginLeft: "5px",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap"
    },
    daysError: {
        textAlign: "center",
        color: "#f44336",
        fontWeight: "initial",
        fontSize: "15px",
        marginTop: "5px"
    },
    timesFlex: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: "5px",
        marginBottom: "10px"
    },
    buttons: {
        display: "flex",
        justifyContent: "space-around"
    },
    modalButton: {
        paddingRight: "12px",
        paddingLeft: "12px"
    }
})

class GradeAssignmentModal extends Component {

    constructor(props) {
        super(props)

        this.state = {
            pointsAwarded: -1,
            pointsAwardedError: ''
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

    handleDialogOpen = () => {
        this.setState({confirmDialogOpen: true})
    }

    handleDialogClose = () => {
        this.setState({confirmDialogOpen: false})
        this.props.closeModal();
    }

    // grade submission api call
    gradeAssignment() {
        let grade = {
            assignmentId: 0,
            studentId: 0,
            grade: 50
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

    validatePointsAwarded = () => {
        if (this.state.pointsAwarded === -1) {
            this.setState({pointsAwardedError: 'Cannot Be Empty'})
        } else if (!/^\d+$/.test(this.state.pointsAwarded)) {
            this.setState({pointsAwardedError: 'Numbers Only'})
        } else {
            this.setState({pointsAwardedError: ''})
        }
    }

    render() {
        const { classes } = this.props

        return (
            <div className={classes.verticalFlex}>
                <div className={classes.title}>
                    <Typography variant="h5">Grade Assignment </Typography>
                </div>
                <div className={classes.assignmentDetails}>
                    <Typography>{this.props.studentId}</Typography>
                    <Typography>{this.props.assignmentId}</Typography>
                </div>
                <TextField
                id="pointsAwarded"
                label="Points"
                style={{ margin: 8 }}
                helperText={this.state.pointsAwardedError === '' ? "" : this.state.pointsAwardedError}
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={this.handlePointsAwardedChange}
                onBlur={this.validatePointsAwarded}
                error={this.state.pointsAwardedError === '' ? false : true}
                />

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
                        Assignment Successfully Added.
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
