import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Course from './Course';

class CourseList extends Component {
    state = {
        isLoggedIn: false,
        courses: [
            {
                title: 'Dummy Course',
                description: 'A dummy course description',
                url: '/dummycourse',
                image: ''
            },
            {
                title: 'Another Course',
                description: 'Another course description',
                url: '/dummycourse2',
                image: ''
            },
            {
                title: 'Another Course',
                description: 'Another course description',
                url: '/dummycourse3',
                image: ''
            },
            {
                title: 'Final Course',
                description: 'The last dummy course on here',
                url: '/dummycourse4',
                image: ''
            }
        ]
    };

    getLoggedIn = async () => {
        // check if user logged in, set state accordingly
    }

    getCourses = async () => {
        
        if (this.state.isLoggedIn) {
            // request course list from API
            // fetch(``)
            //       .then(resp => resp.json())
            //       .then((data) => {
            //         this.setState( {courses: data} )
            //       })
            //       .catch((error) => {
            //         console.log("Error occurred while fetching");
            //         console.log(error);
            //});  
        } else {
            // redirect to login page
        }
    }

    componentDidMount() {
        this.getLoggedIn();
        this.getCourses();
    }

    render() {
        return (
            <div>
                {this.state.courses ? (
                    <div>
                        <Grid container spacing={24} style ={{padding: 24}}>
                            {this.state.courses.map(currentCourse => (
                                <Grid item xs={6} s={4} lg={3} xl={3}>
                                    <Course course={currentCourse} />
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                ) : "No courses found" }
            </div>
        );
    }
}

export default CourseList;