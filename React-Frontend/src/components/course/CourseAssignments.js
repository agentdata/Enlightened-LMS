import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    
})

class CourseAssignments extends Component {


    render() {
        const { classes } = this.props;
        return (
            <div>
                This will be the Course Assignments
            </div>
        )
    }
}

export default withStyles(styles)(CourseAssignments)