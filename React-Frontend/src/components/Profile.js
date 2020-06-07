import React from 'react';
import { Container, Card, CardContent, CardActions, 
        Typography, Button } from '@material-ui/core';

// dummy user object
const user = {
    studentID: 29403,
    email: 'sampleStudent@gmail.com',
    password: 'secretpass',
    firstName: 'Jane',
    lastName: 'Doe',
    birthDate: new Date(1995, 8, 24)
};

// UserDetails Component - renders/displays user info
function UserDetails ({details}) {
        const {email, firstName, lastName, birthDate} = {...details};
        return (
            <Container fixed>
                <Card style={{padding: 10}}>
                    <CardContent>
                        <Typography component="h2" variant="h2">
                            {firstName} {lastName}
                        </Typography>
                        <Typography component="h3" variant="h4" style={{marginTop: 10, marginBottom: 0}}>
                            Email:
                        </Typography>
                        <Typography component="h4" variant="h5">
                            {email}
                        </Typography>
                        <Typography component="h3" variant="h4" style={{marginTop: 20, marginBottom: 0}}>
                            Birthday:
                        </Typography>
                        <Typography component="h4" variant="h5">
                            {birthDate.toLocaleDateString()}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="medium">Logout</Button>
                    </CardActions>
                </Card>
            </Container>
        );
}

// Profile Component - Container for UserDetails
class Profile extends React.Component {
    constructor(props) {
        super(props);
        // this.userDetails = {
        //     // call service to grab user details
        // };
        this.userDetails = user;
        this.state = {
            isLoggedIn: false
        };
        // this.checkLoggedIn = this.checkLoggedIn.bind(this);
    }

    // check that the user is logged in before component is loaded into DOM
    componentDidMount() {
        this.setState(state => ({
            isLoggedIn: true // call method from user/authentication controller/service
        }));
    }

    render() {
        return (
            <div className="header">
                <h1>{this.state.isLoggedIn
                    ? <UserDetails details={this.userDetails} />
                    : '(redirect to login page)'}</h1>
            </div>
        );
    }
}

export default Profile;