import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles"
import CourseToDo from './CourseToDo'

const styles = theme => ({

})

class CourseHome extends Component {

    //TODO find a way to store this, and make it dynamic
    state = {
        homePage:[
            {
                title: "Welcome to the dummy course",
                description: "Here are some resources for the course"
            // },
            // {
            //     title: "Another topic",
            //     description: "Office hours for dummy course"
            }
        ]
    };

    render() {
        return (
            <div>
                <ul>
                    <h1>{this.state.homePage[0].title}</h1>
                    <p>{this.state.homePage[0].description}</p>
                </ul>
            </div>
        )
    }
}

export default withStyles(styles)(CourseHome)