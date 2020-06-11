import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CourseSidebar from './CourseSidebar'
import CourseHome from './CourseHome'
import CourseAssignments from './CourseAssignments'
import CourseGrades from './CourseGrades'
import CourseAnnouncements from './CourseAnnouncements'
import CourseDiscussions from './CourseDiscussions'
import { withStyles } from '@material-ui/core/styles'


const styles = theme => ({
    main: {
        display: "flex"
    }
})

class CoursePage extends Component {
    state = {
        courseName: "Dummy Course",
        courseCredits: "",
        courseDescription: "",
    }

    render() {
        const { classes } = this.props
        return (
            <Router>
                <div className={classes.main}>
                    <CourseSidebar />
                    <Switch>
                        <Route path="/course-page" component={CourseHome} />
                        <Route path="/course-assignments" exact component={CourseAssignments} />
                        <Route path="/course-grades" exact component={CourseGrades} />
                        <Route path="/course-announcements" exact component={CourseAnnouncements} />
                        <Route path="/course-discussions" exact component={CourseDiscussions} />
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default withStyles(styles)(CoursePage)