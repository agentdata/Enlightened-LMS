import React from 'react';
import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles'
import Container from "@material-ui/core/Container"

const styles = theme => ({
    courseCard: {
        display: "table-cell",
        wordWrap: "break-word",
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
    },
    cardColor: {
        height: "200px",
        backgroundColor: "#7C91BF"
    }
})

const Course = (props) => {
    const { classes } = props
    return (
        <div className={classes.courseContainer}>
            { props.course ? (
                <Link to="course-page" style={{textDecoration: 'none'}} className={classes.cardRoot}>
                    <Card className={classes.courseCard}>
                        <Container className={classes.cardColor} 
                        /* style={{backgroundColor: props.course.cardColor}}
                        For now this uses a default color, later maybe settable by user */
                        />
                        {/* <CardMedia
                            // image={props.course.image}
                            image = 'nothing to see here...'
                        /> */}
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