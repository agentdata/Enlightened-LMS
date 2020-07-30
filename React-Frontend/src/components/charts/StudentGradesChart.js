import React from 'react'
import { ResponsiveBar } from '@nivo/bar'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
    //styles
})

// chart that displays analytics for individual assignment grade (Student side)
class StudentGradesChart extends React.Component {
    render() {
        return (
            <div>
                I am the student grade chart for an assignment
            </div>
        );
    }
}

export default withStyles(styles)(StudentGradesChart)

