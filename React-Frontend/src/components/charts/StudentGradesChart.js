import React from 'react'
import { ResponsiveBar } from '@nivo/bar'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
    //styles
})

const data = [
      {
        "stat": "Low score",
        "scoreColor": "hsl(302, 70%, 50%)",
        "score": 72,
      },
      {
        "stat": "High score",
        "scoreColor": "hsl(302, 70%, 50%)",
        "score": 97,
      },
      {
        "stat": "Class Average",
        "scoreColor": "hsl(302, 70%, 50%)",
        "score": 86,
      },
      {
        "stat": "My score",
        "scoreColor": "hsl(302, 70%, 50%)",
        "score": 89,
      },
]

// chart that displays analytics for individual assignment grade (Student side)
class StudentGradesChart extends React.Component {
    render() {
        return (
            <div style={{height: '500px', width: '600px'}}>
                <ResponsiveBar
                    data={data}
                    keys={['score']}
                    indexBy="stat"
                    margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                    padding={0.3}
                    borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
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
                    legends={[
                        {
                            dataFrom: 'keys',
                            anchor: 'bottom-right',
                            direction: 'column',
                            justify: false,
                            translateX: 120,
                            translateY: 0,
                            itemsSpacing: 2,
                            itemWidth: 100,
                            itemHeight: 20,
                            itemDirection: 'left-to-right',
                            itemOpacity: 0.85,
                            symbolSize: 20,
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemOpacity: 1
                                    }
                                }
                            ]
                        }
                    ]}
                    animate={true}
                    motionStiffness={90}
                    motionDamping={15}
                />
            </div>
        );
    }
}

export default withStyles(styles)(StudentGradesChart)

