import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CourseSidebar from './CourseSidebar'
import CourseHome from './CourseHome'
import CourseAssignments from './CourseAssignments'
import CourseGrades from './CourseGrades'
import CourseAnnouncements from './CourseAnnouncements'
import CourseDiscussions from './CourseDiscussions'
import CourseGradesInstructor from './CourseGradesInstructor'
import { withStyles } from '@material-ui/core/styles'
import GradeAssignments from './GradeAssignments';

const styles = theme => ({
    main: {
        width: "100%"
    },
    left: {
        display: "flex",
        justifyContent: "flex-start"
    },
    side: {
        display: "flex",
        flexDirection: 'column'
    }
})

class CoursePage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            courseName: "Dummy Course",
            courseCredits: "",
            courseDescription: "",   
        }
        sessionStorage.setItem("courseId",this.props.match.params.id)
    }

    render() {
        const { classes } = this.props
        const isInstructor = sessionStorage.getItem("isInstructor") === "true" ? true : false 
        return (
            <Router>
                <div className={classes.main}>
                    <div className={classes.left}>
                        <div className={classes.side}>
                        <CourseSidebar match={this.props.match}/>
                        </div>
                        <Switch>
                            <Route path={`/course/${this.props.match.params.id}/course-assignments/:assignmentid`} component={CourseAssignments}/>
                            <Route path={`/course/${this.props.match.params.id}/course-assignments`} component={CourseAssignments}/>
                            {isInstructor ? <Route path={`/course/${this.props.match.params.id}/course-grades`} exact component={CourseGradesInstructor} /> :
                                <Route path={`/course/${this.props.match.params.id}/course-grades`} exact component={CourseGrades} /> }
                            <Route path={`/course/${this.props.match.params.id}/course-announcements`} exact component={CourseAnnouncements} />
                            <Route path={`/course/${this.props.match.params.id}/course-discussions`} exact component={CourseDiscussions} />
                            {isInstructor ? <Route path={`/course/${this.props.match.params.id}/grade-assignments/:assignmentid`} component={GradeAssignments} /> : null }
                            <Route path="/" component={CourseHome} match={this.props.match} />
                        </Switch>
                    </div>
                </div>
            </Router>
        )
    }
}

export default withStyles(styles)(CoursePage)