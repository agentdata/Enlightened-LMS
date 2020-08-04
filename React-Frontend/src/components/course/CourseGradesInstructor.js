import React, { Component, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { withStyles } from "@material-ui/core/styles"
import { Box, Button, Collapse, Table, TableBody, TableCell, TableContainer, TableHead, 
    TablePagination, TableRow, TableSortLabel, Typography, Checkbox, Paper } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import IconButton from '@material-ui/core/IconButton';
import utilities from '../../actions/utilities';
import http from '../../api/http';
import TeacherGradesChart from '../charts/StudentGradesChart';

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
                <TableCell align="right">{assignment.submissions.length === 0? "No submissions": assignment.submissions.length}</TableCell>
                <TableCell align="right">{assignment.gradedCount === undefined ? 0 : assignment.gradedCount}</TableCell>
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
                            <TeacherGradesChart assignment={assignment}></TeacherGradesChart>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default function CourseGradesInstructor() {

    const classes = styles;
    const [assignments, setAssignments] = React.useState([]);
    const [assignmentClicked, setAssignmentClicked] = React.useState({assignmentId: -1});
    const courseId = sessionStorage.getItem('courseId');


    // API call
    useEffect(() => {
        var fetchedAssignments = []
        http.getCourseAssignmentsWithDetails(sessionStorage.getItem("courseId"))
        .then( async(response) => {
            var body = await response.json();
            if(response.status === 200 && body["message"] === "Success"){
                for (let i in body["assignments"]) {
                    let assignment = {
                        title: body["assignments"][i]["title"],
                        description: body["assignments"][i]["description"],
                        maxPoints: body["assignments"][i]["maxPoints"],
                        dueDate: body["assignments"][i]["dueDate"],
                        assignmentID: body["assignments"][i]["id"],
                        submissionType: body["assignments"][i]["submissionType"],
                        submitted: false,
                        highScore: "0",
                        lowScore: "0",
                        averageScore: "0",
                    }
                    if (body["assignments"][i]["submissions"] !== null) {
                        assignment.submissions = body["assignments"][i]["submissions"]
                        assignment.gradedCount = 0
                        for (let j in assignment.submissions) {
                            if (assignment.submissions[j]["graded"] === true) {
                                assignment.gradedCount++;
                            }
                        }
                    }
                    if (assignment.gradedCount > 0) {
                        assignment.highScore = body["assignments"][i]["analytics"]["high"]
                        assignment.lowScore = body["assignments"][i]["analytics"]["low"]
                        assignment.averageScore = body["assignments"][i]["analytics"]["average"]
                    }

                    fetchedAssignments.push(assignment)
                }
            }  
            // set state
            setAssignments(fetchedAssignments)

        })
        .catch((e) => {
            console.warn("There was an error retrieving instructor courses: ", e);
        });
    }, [assignmentClicked]);

    return (
        <div>
            <TableContainer component={Paper}>
                <Typography variant="h4">Grades</Typography>
                <Table className={classes.table} aria-label="grades table">
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell align="right">Due</TableCell>
                            <TableCell align="right">Submissions</TableCell>
                            <TableCell align="right">Graded</TableCell>
                            <TableCell align="right">Out Of</TableCell>
                            <TableCell align="right">Class Average</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {assignments.map((assignment) => (
                        <Row key={ assignment.title } assignment= { assignment } />
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
        // this.state = {
        //     courseId: sessionStorage.getItem('courseId'),
        //     assignments: [
                // {
                //     title: "Assignment 1",
                //     assignmentId: 12345,
                //     dueDate: "1/1/21 11:59pm",
                //     submissions: 10,
                //     graded: 3,
                //     maxPoints: 150,
                //     average: 130
                // },
                // {
                //     title: "Assignment 2",
                //     assignmentId: 123456,
                //     dueDate: "1/9/21 11:59pm",
                //     submissions: 12,
                //     graded: 5,
                //     maxPoints: 120,
                //     average: 90
                // },
                // {
                //     title: "Assignment 3",
                //     assignmentId: 1234567,
                //     dueDate: "1/18/21 11:59pm",
                //     submissions: 5,
                //     graded: 0,
                //     maxPoints: 150,
                //     average: 130
                // }
    //         ]
    //     }
}