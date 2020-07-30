import React, { Component } from 'react';
import { Box, Collapse, Table, TableBody, TableCell, TableContainer, TableHead, 
    TablePagination, TableRow, TableSortLabel, Typography, Checkbox, Paper } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import http from '../../api/http';
import utilities from '../../actions/utilities';
import StudentGradesChart from '../charts/StudentGradesChart';

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
                open: false,
                courseId: "",//"courseId",
                description: "",//"description",
                dueDate: "", //"2020-08-15T11:59:00",
                assignmentId: "", //"assignmentId",
                maxPoints: "", //"maxPoints",
                submissionType: "", //"submissionType",
                title: "", //"title",
                graded: null, //"graded",
                pointsAwarded: "", //"pointsAwarded",
                highScore: "", //"highScore",
                lowScore: "", //"lowScore",
                averageScore: "", //"averageScore",
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
                        highScore: "",
                        lowScore: "",
                        averageScore: "",
                    }
                    // Only count if assignment is graded
                    if(parsedAssignment.graded === true){
                        totalPoints += parsedAssignment.maxPoints
                        pointsEarned += parsedAssignment.pointsAwarded

                        parsedAssignment.highScore = assignment["analytics"]["high"]
                        parsedAssignment.lowScore = assignment["analytics"]["low"]
                        parsedAssignment.averageScore = assignment["analytics"]["average"]
                    }

                    grades.push(parsedAssignment)
                }
                if(totalPoints === 0){
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

    setOpen() {
        this.setState({
            open: !this.state.open
        })
    }

    render() {
        const classes = styles;

        return (
            <div className={classes.root} /*class="studentGradeView"*/>
                <TableContainer component={Paper}>
                <Typography variant="h4">Grades</Typography>
                    <Table className={classes.table} aria-label="grades table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Title</TableCell>
                                <TableCell align="right">Due</TableCell>
                                <TableCell align="right">Status</TableCell>
                                <TableCell align="right">Score</TableCell>
                                <TableCell align="right">Out of</TableCell>
                                <TableCell align="right">Class average</TableCell>
                            </TableRow>
                            </TableHead>
                        <TableBody>
                        {this.state.grades.map((assignment) => (
                            <React.Fragment>
                                <TableRow key={assignment.title}>
                                    <TableCell>
                                        <IconButton aria-label="expand row" size="small" onClick={() => this.setOpen()}>
                                            {this.state.open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                        </IconButton>
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {assignment.title}
                                    </TableCell>
                                    <TableCell align="right">{utilities.formatDateTime(assignment.dueDate)}</TableCell>
                                    <TableCell align="right">{assignment.graded === null? "Not Submitted": assignment.graded ? "Graded": "Submitted"}</TableCell>
                                    <TableCell align="right">{assignment.graded === null? "-": assignment.graded ? assignment.pointsAwarded : "-" }</TableCell>
                                    <TableCell align="right">{assignment.maxPoints}</TableCell>
                                    <TableCell align="right">{assignment.averageScore}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                                            <Box margin={1}>
                                            <Typography variant="h6" gutterBottom component="div">
                                                (GradeChart)
                                            </Typography>
                                            <StudentGradesChart></StudentGradesChart>
                                            {/* <Table size="small" aria-label="chart">
                                                <TableHead>
                                                <TableRow>
                                                </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    <TableRow>
                                                    <TableCell component="th" scope="row">
                                                    </TableCell>
                                                    <TableCell></TableCell>
                                                    <TableCell align="right"></TableCell>
                                                    <TableCell align="right">
                                                    </TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table> */}
                                            </Box>
                                        </Collapse>
                                    </TableCell>
                                </TableRow>
                            </React.Fragment>
                        ))}
                        <TableRow>
                            <TableCell align="right">
                                Total Grade
                            </TableCell>
                            <TableCell align="right">
                            {totalPoints !== 0? Math.floor((pointsEarned/totalPoints)*10000)/100 : 100}%
                            </TableCell>
                        </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        )
    }
}

export default withStyles(styles)(CourseGrades)