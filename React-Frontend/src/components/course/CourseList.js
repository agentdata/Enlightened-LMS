import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Course from './Course';
import { withStyles } from "@material-ui/core/styles"
import Button from '@material-ui/core/Button'
import Modal from '@material-ui/core/Modal';
import AddCourse from './AddCourse';
import CourseSignUp from './CourseSignUp'
import http from '../../api/http'

const styles = theme => ({
    course: {
        minWidth: "300px"
    },
    addCourseBtn: {
        position: "relative",
        backgroundColor: "#3f51b5",
        color: "white",
        width: "200px",
        marginTop: "25px",
        marginLeft: "23px"
    },
    main: {
        display: "flex",
        flexDirection: "column"
    },
    buttonDiv: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start"
    },
    paper: {
        position: 'relative',
        maxWidth: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        margin: "auto",
        top: "100px"
      },
    signUpTable: {
        display: "flex",
        justifyContent: "center",
        width: "90%",
        margin: "auto",
        marginTop: "100px"
    },
    modal: {
        overflow: "scroll"
    }
})

class CourseList extends Component {
    constructor(props) {
        super(props)

        this.handleClose = this.handleClose.bind(this)
        const isInstructorBool = sessionStorage.getItem("isInstructor")
        this.state = {
            error: null,
            modalOpen: false,
            courses: [
                {
                    title: 'Dummy Course',
                    description: 'Another course description',
                    url: '/dummycourse2',
                    image: ''
                },
            ],
            isInstructor: isInstructorBool,
            allCourses: []
        }        

        //TODO figure out the best place to put this so it processes correctly, 
        //if login takes a moment to return this might execute first and execute student when it should execute instructor 
        this.state.isInstructor === "true" ? this.getInstructorCourses(): this.getStudentCourses()   
    }

    // get all courses from db
    getAllCourses() {
        http.getAllCourses()
        .then( async(response) => {
            const body = await response.json();
            if(response.status === 200 && body["message"] === "success"){
                var simpleCourses=[] 
                for (var i in body["courses"]) {

                    simpleCourses[i] = {
                        title: body["courses"][i]["courseName"],
                        description: body["courses"][i]["description"],
                        url: '/dummycourse4',
                        image: ''
                    }
                }
                this.setState({ courses: simpleCourses });
            }
        })
        .catch((e) => {
            console.warn("There was an error retrieving instructor courses: ", e);

            this.setState({
                error: "There was an error retrieving instructor courses."
            });
        });
    }

    // get courses for instructor
    getInstructorCourses() {
        http.getInstructorCourses()
        .then( async(response) => {
            var body = await response.json();
            if(response.status === 200 && body["message"] === "success"){
                var simpleCourses=[] 
                for (var i in body["courses"]) {

                    simpleCourses[i] = {
                        title: body["courses"][i]["courseName"],
                        description: body["courses"][i]["description"],
                        url: '/dummycourse4',
                        image: ''
                    }
                }
                this.setState({ courses: simpleCourses });
            }
        })
        .catch((e) => {
            console.warn("There was an error retrieving instructor courses: ", e);

            this.setState({
                error: "There was an error retrieving instructor courses."
            });
        });
    }

    // get courses for student
    getStudentCourses() {
        http.getStudentCourses()
        .then( async(response) => {
            var body = await response.json();
            if(response.status === 200 && body["message"] === "success"){
                var simpleCourses=[] 
                for (var i in body["courses"]) {
                    simpleCourses[i] = {
                        title: body["courses"][i]["courseName"],
                        description: body["courses"][i]["description"],
                        url: '/dummycourse4',
                        image: ''
                    }
                }
                this.setState({ courses: simpleCourses });
            }
        })
        .catch((e) => {
            console.warn("There was an error retrieving instructor courses: ", e);

            this.setState({
                error: "There was an error retrieving instructor courses."
            });
        });
    }

    handleStudentOpen = () => {
        const headers = new Headers();
        headers.append('Authorization', 'Bearer '+sessionStorage.getItem("token"));
        const init = {
            method: 'GET',
            headers
        };
    
        fetch('https://cooliocoders.ddns.net/api/course/all', init)     
        .then( async(response) => {
            var body = await response.json();
            if(response.status === 200){
                var simpleCourses=[] 
                for (var i in body["courses"]) {
                    simpleCourses[i] ={
                      department: body["courses"][i]["department"],
                      number: body["courses"][i]["courseNumber"],
                      name: body["courses"][i]["courseName"],
                      instructor: body["courses"][i]["courseName"],
                      credits: body["courses"][i]["credits"],
                      days: 'TW', //body["courses"][i]["meetingDays"] //TODO
                      time: body["courses"][i]["startTime"]+"-"+body["courses"][i]["endTime"],
                      semester: body["courses"][i]["semester"],
                      year: body["courses"][i]["year"],
                      id: body["courses"][i]["_id"]
                    }                   
                }
                this.setState({
                    allCourses: simpleCourses}, () =>
                    {
                    this.setState({
                        modalOpen: true
                    })
                })
            }
        })
        .catch((e) => {
            console.warn("There was an error retrieving instructor courses: ", e);
      
            this.setState({
                error: "There was an error retrieving instructor courses."
            });
        })
    }

    handleInstructorOpen = () => {
        this.setState({
            modalOpen: true
        })
    }

    handleClose = () => {
        this.setState({
            modalOpen: false
        })
    }

    render() {
        const { classes } = this.props

        return (
            <div className={classes.main}>
                <div className={classes.buttonDiv}>
                    {this.state.isInstructor === "true" ?
                        <Button className={classes.addCourseBtn} onClick={this.handleInstructorOpen}>+ Add Course</Button>
                        : <Button className={classes.addCourseBtn} onClick={this.handleStudentOpen}>+ Sign Up For Course</Button> }
                </div>
                <Modal
                    className={classes.modal}
                    disableBackdropClick
                    open={this.state.modalOpen}
                    onClose={this.handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    
                {this.state.isInstructor === "true" ? 
                    <div className = {classes.paper}>
                        <AddCourse closeModal = {this.handleClose}/>
                    </div>
                    : 
                    <div className = {classes.signUpTable}>
                        <CourseSignUp closeModal = {this.handleClose} allCourses = {this.state.allCourses}/>    
                    </div>}
                        
                    
                </Modal>
                {this.state.courses ? (
                    <div>
                        <Grid container spacing={2} style ={{padding: 24}}>
                            {this.state.courses.map(currentCourse => (
                                <Grid item xs={6} s={4} lg={3} xl={3} key={currentCourse.title} className={classes.course}>
                                    <Course course={currentCourse} />
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                ) : "No courses found" }
            </div>
        );
    }
}

export default withStyles(styles)(CourseList);
