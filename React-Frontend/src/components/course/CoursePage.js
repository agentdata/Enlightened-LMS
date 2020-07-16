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
        return (
            <Router>
                <div className={classes.main}>
                    <div className={classes.left}>
                        <div className={classes.side}>
                        <CourseSidebar match={this.props.match}/>
                        </div>
                        <Switch>
                            <Route path={`/course/${this.props.match.params.id}/course-assignments`} exact component={CourseAssignments}/>
                            <Route path={`/course/${this.props.match.params.id}/course-grades`} exact component={CourseGrades} />
                            <Route path={`/course/${this.props.match.params.id}/course-announcements`} exact component={CourseAnnouncements} />
                            <Route path={`/course/${this.props.match.params.id}/course-discussions`} exact component={CourseDiscussions} />
                            <Route path="/" component={CourseHome} match={this.props.match} />
                        </Switch>
                    </div>
                </div>
            </Router>
        )
    }
}

export default withStyles(styles)(CoursePage)