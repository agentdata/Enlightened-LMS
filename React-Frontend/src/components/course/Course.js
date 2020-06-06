import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const Course = (props) => {
    return (
        <div>
            { props.course ? (
                <Link to="course-page" style={{textDecoration: 'none'}}>

                    <Card style={{margin: 10}}>
                        <CardMedia style={{height: 0, paddingTop: '56.25%'}}
                            // image={props.course.image}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="headline" component="h2">
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

export default Course;