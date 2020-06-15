import React from 'react';
import { Container, Card, CardContent, CardActions, 
        Typography, Button, Avatar, List, ListItem } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import SelectInput from '@material-ui/core/Select/SelectInput';
import FileUploader from './sitewide/FileUploader';
import { withStyles } from '@material-ui/core/styles'
import UserDetails from './UserDetails'

        // UserDetails Component - renders/displays user info

const styles = theme => ({
    main: {
        width: "100%"
    }
})

// Profile Component - Container for UserDetails
class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null
        };

        this.getUserDetails = this.getUserDetails.bind(this);
        this.setUserDetails = this.setUserDetails.bind(this);
    }

    initializeUserChanges = (updatedFields) => {
        this.setState({
            userDetails: updatedFields
        })

        this.setUserDetails(this.state.userDetails)
    }

    // implement post api call to update user profile - child component uses callback
    setUserDetails(updatedFields) {
        // set the state to reflect changes based on user input

        var statusCode;
        const headers = new Headers();
        headers.append('Authorization', 'Bearer '+sessionStorage.getItem("token"));

        const init = {
            method: 'POST',
            headers,
            body: JSON.stringify(updatedFields)
        };

        fetch('https://cooliocoders.ddns.net/api/user/profile', init)
            .then(async response => {
                const text = await response.json();
                statusCode = response.status;

                this.setState({userDetails:
                    {
                        email: text["email"],
                        firstName: text["firstName"],
                        lastName: text["lastName"],
                        phone: text["phone"],
                        birthDate: text["birthDate"],
                        state: text["state"],
                        city: text["city"],
                        zip: text["zip"],
                        address1: text["address1"],
                        bio: text["bio"],
                        avatar: text["avatar"],
                        link1: text["link1"],
                        link3: text["link3"],
                        link2: text["link2"]
                    }
                })
            }).catch((e) => {
                console.warn('There was an error saving user details: ', e)

                this.setState({
                    error: 'There was an error saving user details.'
            })
        });
    }

    getUserDetails(){
        var statusCode;
        const headers = new Headers();
        headers.append('Authorization', 'Bearer '+sessionStorage.getItem("token"));
    
        const init = {
            method: 'GET',
            headers
        };
    
        fetch('https://cooliocoders.ddns.net/api/user/profile', init)
        .then((response) => {
            statusCode = response.status;
            return response.json(); // or .text() or .blob() ...
        })
        .then((text) => this.setState({userDetails:
                {
                    email: text["email"],
                    firstName: text["firstName"],
                    lastName: text["lastName"],
                    phone: text["phone"],
                    birthDate: text["birthDate"],
                    state: text["state"],
                    city: text["city"],
                    zip: text["zip"],
                    address1: text["address1"],
                    bio: text["bio"],
                    avatar: text["avatar"],
                    link1: text["link1"],
                    link3: text["link3"],
                    link2: text["link2"]
                }
            }
        ))
        .catch((e) => {
            console.warn('There was an error retrieving user details: ', e)

            this.setState({
                error: 'There was an error retrieving user details.'
            })
        }); 
    }

    // check that the user is logged in before component is loaded into DOM
    componentDidMount() {
        // this.setState(state => ({
        //     isLoggedIn: true // call method from user/authentication controller/service
        // }));
        this.getUserDetails();
        console.log("current state.userDetails : "+JSON.stringify(this.state.userDetails));
    }

    render() {
        const { classes } = this.props
        return (
            <div className={classes.main}>
                <UserDetails details={this.state.userDetails} updateCallback={this.initializeUserChanges} />
            </div>
        );
    }
}

export default withStyles(styles)(Profile);