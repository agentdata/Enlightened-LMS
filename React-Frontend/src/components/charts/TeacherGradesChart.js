import React from 'react'
import { ResponsiveBar } from '@nivo/bar'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
    //styles
})

// chart that displays analytics for individual assignment grade (Instructor side)
function TeacherGradesChart(props) {
    const { maxPoints, pointsAwarded, highScore, lowScore, averageScore } = {...props.assignment};
    
    const data = [
        {
            "stat": "Low score",
            "score": lowScore.toFixed(2)
        },
        {
            "stat": "High score",
            "score": highScore.toFixed(2)
        },
        {
            "stat": "Class average",
            "score": averageScore.toFixed(2)
        }
    ]
    
    return (
        <div style={{height: '500px', width: '500px', borderBottom: 'none'}}>
            <ResponsiveBar
                data={data}
                keys={['score']}
                indexBy="stat"
                margin={{ top: 30, right: 50, bottom: 50, left: 60 }}
                padding={0.3}
                colors={{scheme: "set2"}}
                colorBy="index"
                borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
                maxValue={maxPoints}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: '',
                    legendPosition: 'middle',
                    legendOffset: 32
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'percentage',
                    legendPosition: 'middle',
                    legendOffset: -45
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
                animate={true}
                motionStiffness={90}
                motionDamping={15}
            />
        </div>
    );
}

export default withStyles(styles)(TeacherGradesChart)