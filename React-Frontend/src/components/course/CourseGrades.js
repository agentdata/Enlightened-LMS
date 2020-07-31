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

let pointsEarned = 0
let totalPoints = 0

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
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box style={{height: '550px', width: '600px'}}>
                                <Typography variant="h6" gutterBottom component="div">
                                    Grade Analytics
                                </Typography>
                                <StudentGradesChart assignment={assignment}></StudentGradesChart>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </React.Fragment>
    );
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
                            {totalPoints !== 0? Math.floor((pointsEarned/totalPoints)*10000)/100 : 100}%
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}