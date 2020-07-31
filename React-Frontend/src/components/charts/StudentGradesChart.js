import React from 'react'
import { ResponsiveBar } from '@nivo/bar'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
    //styles
})

// chart that displays analytics for individual assignment grade (Student side)
function StudentGradesChart(props) {

    const { maxPoints, pointsAwarded, highScore, lowScore, averageScore } = {...props.assignment};
    
    const data = [
        {
            "stat": "My score",
            "score": pointsAwarded
        },
        {
            "stat": "Low score",
            "score": lowScore
        },
        {
            "stat": "High score",
            "score": highScore
        },
        {
            "stat": "Class average",
            "score": averageScore
        }
    ]
    
    return (
        <div style={{height: '500px', width: '600px'}}>
            <ResponsiveBar
                data={data}
                keys={['score']}
                indexBy="stat"
                margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
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
                    legendOffset: -40
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

export default withStyles(styles)(StudentGradesChart)

