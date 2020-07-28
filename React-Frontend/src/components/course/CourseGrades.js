import React, { Component } from 'react';
import { Grid, Paper } from '@material-ui/core'
import { withStyles } from "@material-ui/core/styles"
import http from '../../api/http'

const styles = theme => ({
    root: {
        flexGrow: 1,
      },
      paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      },
})

let pointsEarned = 0
let totalPoints = 0

class CourseGrades extends Component {
    constructor(props){
        super(props)
        this.state ={
            grades: [{
                courseId: "courseId",
                description: "description",
                dueDate: "dueDate",
                assignmentId: "assignmentId",
                maxPoints: "maxPoints",
                submissionType: "submissionType",
                title: "title",
                graded: "graded",
                pointsAwarded: "pointsAwarded",
            },]
        }
    }
    componentDidMount(){
        this.getGrades();
    }
    getGrades = () => {
        http.getStudentGrades(sessionStorage.getItem("courseId"))
        .then( async (response) => {
            const data = await response.json();
            if (response.status === 200 && data["message"] === "Success") {
                var grades = []
                for(let assignment of data["assignmentsAndGradesDetails"]){
                    let parsedAssignment = {
                        courseId: assignment["assignmentDetails"]["courseId"],
                        description: assignment["assignmentDetails"]["description"],
                        dueDate: assignment["assignmentDetails"]["dueDate"],
                        assignmentId: assignment["assignmentDetails"]["assignmentId"],
                        maxPoints: assignment["assignmentDetails"]["maxPoints"],
                        submissionType: assignment["assignmentDetails"]["submissionType"],
                        title: assignment["assignmentDetails"]["title"],
                        graded: assignment["graded"],
                        pointsAwarded: assignment["pointsAwarded"],
                    }
                    // Only count if assignment is graded
                    if(parsedAssignment.graded == true){
                        totalPoints += parsedAssignment.maxPoints
                        pointsEarned += parsedAssignment.pointsAwarded
                    }

                    grades.push(parsedAssignment)
                }
                if(totalPoints == 0){
                    totalPoints = 1
                    pointsEarned = 1
                }
                this.setState({grades: grades})
            }
        })
        .catch((e) => {
            console.warn("There was an error retrieving submissions: ", e);
        })
    }

    render() {

        const classes = styles;

        return (
            <div className={classes.root} /*class="studentGradeView"*/>
                <Grid container spacing={3}>
                    <Grid>
                        
                    </Grid>
                    <Grid item xs={1}>
                        <Paper className={classes.paper}>Title</Paper>
                    </Grid>
                    <Grid item xs={1}>
                        <Paper className={classes.paper}>Due</Paper>
                    </Grid>
                    <Grid item xs={1}>
                        <Paper className={classes.paper}>Status</Paper>
                    </Grid>
                    <Grid item xs={1}>
                        <Paper className={classes.paper}>Score</Paper>
                    </Grid>
                    <Grid item xs={1}>
                        <Paper className={classes.paper}>Out of</Paper>
                    </Grid>
                    <Grid item xs={1}>
                        <Paper className={classes.paper}>class average</Paper>
                    </Grid>


                {this.state.grades.map(assignment =>(
                    
                    <tr>
                        <td>{assignment.title}</td>
                        <td>{assignment.dueDate}</td>
                        <td>{assignment.graded === null? "Not Submitted": assignment.graded ? "Graded": "Submitted"}</td>
                        <td>{assignment.graded === null? "-": assignment.graded ? assignment.pointsAwarded : "-" }</td>
                        <td>{assignment.maxPoints}</td>
                        <td>avg</td>
                    </tr>
                ))}
                    <tr></tr>
                    <tr>
                        <td>Total Grade</td>
                        <td>{
                            Math.floor((pointsEarned/totalPoints)*10000)/100
                        }%</td>
                    </tr>
                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(CourseGrades)