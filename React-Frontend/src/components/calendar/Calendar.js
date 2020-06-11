import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles"

const styles = theme => ({
    calendarContainer: {
        tableLayout: "fixed",
        display: "table",
        width: "100%",
        borderCollapse: "collapse"
    },
})

class Calendar extends Component {

    render() {

        const { classes } = this.props
        return (
            <div className={classes.calendarContainer}>
                This will be the calendar
            </div>
        )
    }
}

export default withStyles(styles)(Calendar)