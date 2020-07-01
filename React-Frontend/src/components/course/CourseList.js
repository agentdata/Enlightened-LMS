import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Course from './Course';
import { withStyles } from "@material-ui/core/styles"
import Button from '@material-ui/core/Button'
import Modal from '@material-ui/core/Modal';
import AddCourse from './AddCourse';
import CourseSignUp from './CourseSignUp'

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

        this.state = {
            error: null,
            modalOpen: false,
            isInstructor: false,
            courses: [
                // {
                //     title: 'Dummy Course',
                //     description: 'A dummy course description',
                //     url: '/dummycourse',
                //     image: ''
                // },
                // {
                //     title: 'Another Course',
                //     description: 'Another course description',
                //     url: '/dummycourse2',
                //     image: ''
                // },
                // {
                //     title: 'One More Course',
                //     description: 'Another course description',
                //     url: '/dummycourse3',
                //     image: ''
                // },
                // {
                //     title: 'Final Course',
                //     description: 'The last dummy course on here',
                //     url: '/dummycourse4',
                //     image: ''
                // }
            ]
        };
    }

     // get courses for instructor
     getInstructorCourses() {
        var statusCode;
        const headers = new Headers();
        headers.append('Authorization', 'Bearer '+sessionStorage.getItem("token"));
        const init = {
            method: 'GET',
            headers
        };

        fetch('https://cooliocoders.ddns.net/api/course/user', init)
        .then( async (response) => {
            response = await response.json();
            console.log("----\nCourses in DB\n----\n"+JSON.stringify(response)+"----");

            //TODO, add courses info from response to course cards and display.
            return this.setState({
                courses: response["courses"]
            })

        }).catch((e) => {
            console.warn("There was an error retrieving instructor courses: ", e);

            this.setState({
                error: "There was an error retrieving instructor courses."
            });
        });
    }

    // get courses for student
    getStudentCourses = async() => {

    }

    componentDidMount() {
        this.getInstructorCourses();
    }

    handleOpen = () => {
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
                    {this.state.isInstructor ? (
                        <Button className={classes.addCourseBtn} onClick={this.handleOpen}>+ Add Course</Button>
                    ) : <Button className={classes.addCourseBtn} onClick={this.handleOpen}>+ Sign Up For Course</Button> }
                </div>
                <Modal
                    className={classes.modal}
                    disableBackdropClick
                    open={this.state.modalOpen}
                    onClose={this.handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    
                        {this.state.isInstructor ? (
                            <div className={classes.paper}>
                                <AddCourse closeModal={this.handleClose}/>
                            </div>
                        ) : 
                            <div className={classes.signUpTable}>
                                <CourseSignUp closeModal={this.handleClose}/>    
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
