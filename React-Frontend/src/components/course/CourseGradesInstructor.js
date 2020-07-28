import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { withStyles } from "@material-ui/core/styles"
import { Button } from "@material-ui/core"
import http from '../../api/http';

const styles = theme => ({

})

class CourseGradesInstructor extends Component {

    constructor(props) {
        super(props);

        

        this.state = {
            courseId: sessionStorage.getItem('courseId'),
            assignments: [
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
            ]
        }
        
    }

    componentDidMount() {
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
                }
                if(body["assignments"][i]["submissions"] !== null){
                assignment.submitted = true
                assignment.graded = body["assignments"][i]["submissions"]["graded"]
                if(body["assignments"][i]["submissions"]["pointsAwarded"] !== null){
                    assignment.pointsAwarded = body["assignments"][i]["submissions"]["pointsAwarded"]
                }
                assignment.Submission = body["assignments"][i]["submissions"]
                
                }
                
                fetchedAssignments.push(assignment)
            }  
            // set state
            this.setState({assignments: fetchedAssignments})
            }
        })
        .catch((e) => {
            console.warn("There was an error retrieving instructor courses: ", e);
        });
    }
  
      

    render() {
        return (
            <div class="studentGradeView">
                <table border = "5px" cellPadding="7px">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Due</th>
                            <th>Submissions</th>
                            <th>Graded</th>
                            <th>Out Of</th>
                            <th>Class Average</th>
                            <th>Grade Submissions</th>
                        </tr>
                    </thead>
                {this.state.assignments.map(assignment =>(
                    
                    <tr>
                        <td>{assignment.title}</td>
                        <td>{assignment.dueDate}</td>
                        <td>{assignment.Submission.length}</td>
                        <td>{assignment.graded === undefined ? 0 : assignment.graded}</td>
                        <td>{assignment.maxPoints}</td>
                        <td>avg</td>
                        <td><Button component={Link} to={`/course/${this.state.courseId}/grade-assignments/${assignment.assignmentID}`}>Grade</Button></td>
                    </tr>
                ))}
                </table>
            </div>
        )
    }
}

export default withStyles(styles)(CourseGradesInstructor)