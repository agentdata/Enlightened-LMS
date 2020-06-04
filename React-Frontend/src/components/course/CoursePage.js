import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Course from './Course';
import CourseSidebar from './CourseSidebar'

class CoursePage extends Component {
    state = {
        courseName: "",
        courseCredits: "",
        courseDescription: "",

    }

    render() {
        return (
            <div>
                <CourseSidebar></CourseSidebar>
            </div>
        )
    }
}

export default CoursePage