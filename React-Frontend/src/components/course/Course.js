import React from 'react';
import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
    courseCard: {
        display: "table-cell",
        wordWrap: "break-word",
        paddingTop: "150px" /* this will most likely be removed when an image is added to card */
    },
    courseContainer: {
        tableLayout: "fixed",
        display: "table",
        width: "100%",
        borderCollapse: "collapse"
    },
    cardContent: {
        wordWrap: "break-word"
    },
    cardRoot: {
        display: "flex",
        flexDirection: "column"
    }
})

const Course = (props) => {
    const { classes } = props
    return (
        <div className={classes.courseContainer}>
            { props.course ? (
                <Link to="course-page" style={{textDecoration: 'none'}} className={classes.cardRoot}>
                    <Card className={classes.courseCard}>
                        <CardMedia
                            // image={props.course.image}
                            image = 'nothing to see here...'
                        />
                        <CardContent className={classes.cardContent}>
                            <Typography gutterBottom variant="h6" component="h2">
                                {props.course.title}
                            </Typography>
                            <Typography component="p">
                                {props.course.description}
                            </Typography>
                        </CardContent>
                    </Card>
                </Link>
            ): null }
        </div>
    );
}

export default withStyles(styles)(Course);