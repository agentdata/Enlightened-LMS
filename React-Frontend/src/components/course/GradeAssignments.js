import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles"
import { Typography, List, ListItem, 
        ListItemText, Button, Link, Divider } from '@material-ui/core';

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
        borderBottom: "3px solid black"
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
            submissions: 0,
            graded: 0,
            submissionType: "TEXTBOX",
            maxPoints: 150,
            assignmentSubmissions: [{
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
            }]
        }
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
                            <div key={currentSubmission.studentId + currentSubmission.submittedTimestamp}>
                            <div className={classes.flexHorizontal}>
                                <ListItem button className={classes.nested} /*onClick={() => handleSubmissionClick()}*/>
                                    <ListItemText primary={currentSubmission.studentName} 
                                    secondary={" Submitted: " + currentSubmission.submittedTimestamp}  />
                                    <Typography className={currentSubmission.isGraded ? classes.graded : classes.notGraded}>{currentSubmission.isGraded ? "Graded: " + currentSubmission.pointsAwarded + "/" + this.state.maxPoints : "Not Graded"}</Typography>
                                </ListItem>
                            </div>
                            <Divider />
                            </div>
                        ))}
                    </List>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(GradeAssignments)