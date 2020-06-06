import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Course from './Course';
import CourseSidebar from './CourseSidebar'


class CoursePage extends Component {
    state = {
        courseName: "Dummy Course",
        courseCredits: "",
        courseDescription: "",
    }

    render() {
        return (
            <div>
                {this.props.courseName}
                <CourseSidebar></CourseSidebar>
            </div>
        )
    }
}

export default CoursePage