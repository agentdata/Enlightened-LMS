import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({

})

class CourseAssignments extends Component {

    state = {
        assignments:[
            {
                title: "Assignment 1",
                points: 100,
                dueDate: "6/30/2020 11:59 PM"
            },
            {
                title: "Assignment 2",
                points: 150,
                dueDate: "7/12/2020 11:59 PM"
            }
        ]
    };

    render() {
        // const { classes } = this.props;
        return (
            <div>
                <ul>
                    <h2>{this.state.assignments[0].title}</h2>
                    <p>Points: {this.state.assignments[0].points}</p>
                    <p>Due at {this.state.assignments[0].dueDate}</p>

                    <h2>{this.state.assignments[1].title}</h2>
                    <p>Points: {this.state.assignments[1].points}</p>
                    <p>Due at {this.state.assignments[1].dueDate}</p>
                </ul>

            </div>
        )
    }
}

export default withStyles(styles)(CourseAssignments)