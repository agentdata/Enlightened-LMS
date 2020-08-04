import React, { Component, useEffect } from 'react';
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

let pointsEarned = 0;
let totalPoints = 0;
let grade = 100;
let letterGrade = "A+";

function Row(props) {
    const { assignment } = props;
    const [open, setOpen] = React.useState(false);

    return (
            <React.Fragment>
                <TableRow key={assignment.title}>
                    <TableCell>
                        <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
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
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                        {!!assignment.graded ? (
                            <Box style={{display: 'flex', flexFlow: 'column', padding: '10px'}}>
                                <div>
                                    <Typography variant="h5" gutterBottom component="div">
                                        Grade Analytics
                                    </Typography>
                                    <hr />
                                </div>
                                <div style={{display: 'flex'}}>
                                    <StudentGradesChart assignment={assignment}></StudentGradesChart>
                                    <div style={{marginTop: '25px'}}>
                                        <Typography variant="h6" style={{color: "#00F"}}>
                                            My score: {assignment.pointsAwarded} / {assignment.maxPoints} ({((assignment.pointsAwarded/assignment.maxPoints).toFixed(2))*100}%)
                                        </Typography>
                                        <Typography variant="h6">
                                            Low score: {assignment.lowScore} / {assignment.maxPoints} ({((assignment.lowScore/assignment.maxPoints).toFixed(2))*100}%)
                                        </Typography>
                                        <Typography variant="h6">
                                            High score: {assignment.highScore} / {assignment.maxPoints} ({((assignment.highScore/assignment.maxPoints).toFixed(2))*100}%)
                                        </Typography>
                                        <Typography variant="h6">
                                            Class average: {assignment.averageScore} / {assignment.maxPoints} ({((assignment.averageScore/assignment.maxPoints).toFixed(2))*100}%)
                                        </Typography>
                                    </div>
                                </div>
                            </Box>
                        ):
                            <Typography variant="h5" style={{padding: '10px'}}>
                                Not yet graded!
                            </Typography>
                        }
                        </Collapse>
                    </TableCell>
                </TableRow>
            </React.Fragment>
    );
}

function computeLetterGrade(g){
    if(g >= 97)
        return "A+"
    else if(g >= 93)
        return "A"
    else if(g >= 90)
        return "A-"
    else if(g >= 87)
        return "B+"
    else if(g >= 83)
        return "B"
    else if(g >= 80)
        return "B-"
    else if(g >= 77)
        return "C+"
    else if(g >= 73)
        return "C"
    else if(g >= 70)
        return "C-"
    else if(g >= 67)
        return "D+"
    else if(g >= 63)
        return "D"
    else if(g >= 60)
        return "D-"
    else
        return "F"
}

export default function CourseGrades() {

    const classes = styles;
    const [grades, setGrades] = React.useState([]);
    const [assignmentClicked, setAssignmentClicked] = React.useState({assignmentId: -1});

    // this.state ={
    //         grades: [{
    //             open: false,
    //             courseId: "",//"courseId",
    //             description: "",//"description",
    //             dueDate: "", //"2020-08-15T11:59:00",
    //             assignmentId: "", //"assignmentId",
    //             maxPoints: "", //"maxPoints",
    //             submissionType: "", //"submissionType",
    //             title: "", //"title",
    //             graded: null, //"graded",
    //             pointsAwarded: "", //"pointsAwarded",
    //             highScore: "", //"highScore",
    //             lowScore: "", //"lowScore",
    //             averageScore: "", //"averageScore",
    //         },]
    //     }

    useEffect(() => {
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
                grade = Math.floor((pointsEarned/totalPoints)*10000)/100
                letterGrade = computeLetterGrade(grade)
                setGrades(grades)
            }
        })
        .catch((e) => {
            console.warn("There was an error retrieving submissions: ", e);
        })
    }, [assignmentClicked])

    return (
        <div className={classes.root} /*class="studentGradeView"*/>
            <TableContainer component={Paper}>
                <Typography variant="h4">Grades</Typography>
                <Table className={classes.table} aria-label="grades table">
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell align="right">Due</TableCell>
                            <TableCell align="right">Status</TableCell>
                            <TableCell align="right">Score</TableCell>
                            <TableCell align="right">Out of</TableCell>
                            <TableCell align="right">Class average</TableCell>
                        </TableRow>
                        </TableHead>
                    <TableBody>
                    {grades.map((grade) => (
                        <Row key={ grade.title } assignment={ grade } />
                    ))}
                        <TableRow>
                            <TableCell align="right">
                                Total Grade
                            </TableCell>
                            <TableCell align="right">
                                {totalPoints !== 0? grade : 100}%
                            </TableCell>
                            <TableCell align="right">
                                {letterGrade}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}