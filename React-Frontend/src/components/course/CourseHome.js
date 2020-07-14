import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles"
import http from '../../api/http'

const styles = theme => ({

})

class CourseHome extends Component {
    constructor(props){
        super(props)

        //TODO find a way to store this, and make it dynamic
        this.state = {
                    title: "Welcome to the dummy course",
                    description: "Here are some resources for the course"
                }
            
        }
        // this.getCourseAssignments()
    
    // getCourseAssignments(){
    // http.getCourseDetails(this.props.match.id)
    //     .then( async(response) => {
    //     var body = await response.json();
    //     if(response.status === 200 && body["message"] === "success"){
    //         this.setState({title: body["course"]["courseName"]})
    //         this.setState({description: body["course"]})
    //     }
    // })
    // .catch((e) => {
    //     console.warn("There was an error retrieving instructor courses: ", e);

    //     this.setState({
    //         error: "There was an error retrieving instructor courses."
    //     });
    // });
    // }
    

    render() {
        return (
            <div>
                <ul>
                    <h1>{this.state.title}</h1>
                    <p>{this.state.description}</p>
                </ul>
            </div>
        )
    }
}

export default withStyles(styles)(CourseHome)