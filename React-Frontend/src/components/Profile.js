import React from 'react';
import { Container, Card, CardContent, CardActions, 
        Typography, Button, Avatar } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import SelectInput from '@material-ui/core/Select/SelectInput';
import FileUploader from './sitewide/FileUploader';

        // UserDetails Component - renders/displays user info

class UserDetails extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            changesMade: false,
            userUIDetails: this.props.details
        };
    }

    componentDidUpdate() {

    }

    render() {
        const {email, firstName, lastName, phone, birthDate, state, city, zip, address1, bio, avatar, link1, link2, link3} = {...this.props.details};
        return (
            <Container fixed>
                <Card style={{padding: 10}}>
                    <CardContent>
                        <Grid>
                            <Grid item xs={6} s={4} lg={3} xl={3}>
                                <Card>
                                    <Avatar alt={firstName + '\'s avatar'} src={avatar} style={{ width: '80px', height: '80px', margin: '0 auto'}}/>
                                    <FileUploader uploadType="new avatar"/>
                                </Card>
                            </Grid>
                        </Grid>
                        <Typography component="h2" variant="h2">
                            {firstName} {lastName}
                        </Typography>
                        <Button>Edit</Button>
                        <Typography component="h3" variant="h4" style={{marginTop: 10, marginBottom: 0}}>
                            Email:
                        </Typography>
                        <Typography component="h4" variant="h5">
                            {email}
                        </Typography>
                        <Typography component="h3" variant="h4" style={{marginTop: 10, marginBottom: 0}}>
                            Phone:
                        </Typography>
                        <Typography component="h4" variant="h5">
                            {phone}
                        </Typography>
                        <Typography component="h3" variant="h4" style={{marginTop: 10, marginBottom: 0}}>
                            Birthday:
                        </Typography>
                        <Typography component="h4" variant="h5">
                            //{birthDate}
                        </Typography>
                        <Typography component="h3" variant="h4" style={{marginTop: 10, marginBottom: 0}}>
                            Bio:
                        </Typography>
                        <Typography component="h4" variant="h5">
                            {bio}
                        </Typography>
                        <Typography component="h3" variant="h4" style={{marginTop: 10, marginBottom: 0}}>
                            Address:
                        </Typography>
                        <Typography component="h4" variant="h5">
                            {address1} {city} , {state} {zip}
                        </Typography>
                        <Typography component="h3" variant="h4" style={{marginTop: 10, marginBottom: 0}}>
                            Facebook:
                        </Typography>
                        <Typography component="h4" variant="h5">
                            <a href={link1}>My facebook profile</a>
                        </Typography>
                        <Typography component="h3" variant="h4" style={{marginTop: 10, marginBottom: 0}}>
                            LinkedIN:
                        </Typography>
                        <Typography component="h4" variant="h5">
                            <a href={link2}>My LinkedIN profile</a>
                        </Typography>
                        <Typography component="h3" variant="h4" style={{marginTop: 10, marginBottom: 0}}>
                            Facebook:
                        </Typography>
                        <Typography component="h4" variant="h5">
                            <a href={link3}>My GitHub profile</a>
                        </Typography>
                    </CardContent>
                    <CardActions>
                        {this.state.changesMade && <Button size="medium" 
                            onClick={() => this.props.updateCallback(this.state.userUIDetails)}>Save changes</Button>}
                        <Button size="medium">Logout</Button>
                    </CardActions>
                </Card>
            </Container>
        );
    }
}    

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

        //Validate URL and email fields
        let valid = true;
        let email = this.getUserDetails.email;
        let link1 = this.getUserDetails.link1;
        let link2 = this.getUserDetails.link2;
        let link3 = this.getUserDetails.link3;

        if(!isEmail(email)){valid = false;}
        else if(!isUrl(link1)){valid = false;}
        else if(!isUrl(link2)){valid = false;}
        else if(!isUrl(link3)){valid = false;}

        function isEmail(email)
        {
            let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;    //email regex
            if (regex.test(email))
                return true;
            return false;
        }
        function isUrl(url) {
            try{new URL(url);}
            catch (_){return false;}
            return true;
        }

        if(valid)   //This only runs if the email and urls are valid
        {
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
        else
        {
            //TODO Email or URL is invalid
        }
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
        return (
            <div>
                <UserDetails details={this.state.userDetails} updateCallback={this.initializeUserChanges} />
            </div>
        );
    }
}

export default Profile;