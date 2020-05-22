import React from 'react';
// import UserService from './userService';

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
            <div style={{
                margin: '3rem',
                borderStyle: 'solid',
                borderColor: '#34c',
                color: '#333'
            }}>
                <h3 style={{
                    backgroundColor: '#34c',
                    color: '#FFF',
                    margin: 0
                }}>
                    {firstName} {lastName}
                </h3>
                <h4 style={{ marginBottom: '1rem' }}>Email:</h4>
                <h5 style={{ margin: 0 }}>{email}</h5>
                <h4 style={{ marginBottom: '1rem' }}>Birthday:</h4>
                <h5 style={{ margin: 0 }}>{birthDate.toLocaleDateString()}</h5>
            </div>
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