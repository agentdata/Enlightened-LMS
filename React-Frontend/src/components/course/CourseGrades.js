import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles"
import http from '../../api/http'

const styles = theme => ({

})
let totalGrade = 0.0
let gradeCount = 0

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
                    if(parsedAssignment.graded == true) {
                        totalGrade += parsedAssignment.pointsAwarded / parsedAssignment.maxPoints
                        gradeCount++
                    }
                    grades.push(parsedAssignment)
                }
                if(gradeCount == 0){
                    gradeCount = 1
                    totalGrade = 1
                }

                this.setState({grades: grades})
            }
        })
        .catch((e) => {
            console.warn("There was an error retrieving submissions: ", e);
        })
    }

    render() {
        return (
            <div class="studentGradeView">
                <table border = "5px" cellPadding="7px">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Due</th>
                            <th>Status</th>
                            <th>Score</th>
                            <th>Out of</th>
                            <th>class average</th>
                        </tr>
                    </thead>
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
                            Math.floor(((totalGrade / gradeCount) * 10000))/100
                        }%</td>
                    </tr>
                </table>
            </div>
        )
    }
}

export default withStyles(styles)(CourseGrades)