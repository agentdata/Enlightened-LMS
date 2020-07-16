import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles"
import http from '../../api/http'

const styles = theme => ({

})


class CourseHome extends Component {
    constructor(props){
        super(props)

        //TODO find a way to store this, and make it dynamic
        this.state = {
                    courseName: "Welcome to the dummy course",
                    description: "Here are some resources for the course",
                    instructor: {
                        "firstName": "Teacher",
                        "lastName": "User",
                        "email": "teacher@cc.net",
                    },
                    buildingName:"Wber Engineering",
                    roomNumber:"410",
                }
        this.getCourseAssignments(sessionStorage.getItem("courseId"));
    }

    getCourseAssignments(courseId){
        http.getCourseDetails(courseId)
            .then( async(response) => {
            var body = await response.json();
            if(response.status === 200 && body["message"] === "success"){
                this.setState({
                    courseName: body["course"]["courseName"],
                    description: body["course"]["description"],
                    instructor: body["course"]["instructor"],
                    buildingName: body["course"]["buildingName"],
                    roomNumber: body["course"]["roomNumber"],
                    
                })
            }
        })
        .catch((e) => {
            console.warn("There was an error retrieving instructor courses: ", e);
    
            this.setState({
                error: "There was an error retrieving instructor courses."
            });
        });
    }
    

    render() {
        return (
            <div>
                <ul>
                    <h1>Course: {this.state.courseName}</h1>
                    <p>Description: {this.state.description}</p>
                    <p>Instructor: {this.state.instructor.firstName} {this.state.instructor.lastName} - {this.state.instructor.email}</p>
                    <p>Location: {this.state.buildingName} {this.state.roomNumber} </p>
                </ul>
            </div>
        )
    }
}

export default withStyles(styles)(CourseHome)