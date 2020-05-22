import React, { Component } from "react";
import { connect } from "react-redux";
import {Redirect} from "react-router-dom";
import { registerUser } from "../actions";
import { withStyles } from "@material-ui/styles";
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import configureStore from "../configureStore";
import App from "../App";
import { BrowserRouter as Router } from "react-router-dom";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";

const styles = () => ({
    "@global": {
      body: {
        backgroundColor: "#efefef"
      }
    },
    paper: {
      marginTop: 100,
      display: "flex",
      padding: 40,
      flexDirection: "column",
      alignItems: "center"
    },
    avatar: {
      marginLeft: "auto",
      marginRight: "auto",
      backgroundColor: "#f50060"
    },
    form: {
      marginTop: 1
    },
    errorText: {
      color: "#f50060",
      marginBottom: 5,
      textAlign: "center"
    },
    Button: {
        marginTop: 10
    },
});

const store = configureStore();

class Register extends Component {
    state = { firstName: "", lastName: "", birthDate: "", email: "", password: "", confirmPassword: "" };

    /* #region Handle Text Changes
     * update states during input
     */
    handleFirstNameChange = ({ target }) => {
        this.setState({ firstName: target.value });
    };

    handleLastNameChange = ({ target }) => {
        this.setState({ lastName: target.value });
    };

    handleBirthDateChange = ({ target }) => {
        this.setState({ birthDate: target.value });
    };

    handleEmailChange = ({ target }) => {
        this.setState({ email: target.value });
    };

    handlePasswordChange = ({ target }) => {
        this.setState({ password: target.value });
    };

    handleConfirmPasswordChange = ({ target }) => {
        this.setState({ confirmPassword: target.value });
    };
    /* #endregion */

    // handle register button
    handleRegister = () => {
        // check inputs are filled out TODO: IMPROVE INPUT VALIDATION
        if (this.firstName !== "" && this.lastName !== "" && this.birthDate !== "" &&
            this.password === this.confirmPassword) {
            const { dispatch } = this.props;
            const { firstName, lastName, birthDate, email, password } = this.state;
            // call registerUser in auth.js
            dispatch(registerUser(firstName, lastName, birthDate, email, password));
            // render main page after registration
            ReactDOM.render(
                <Provider store={store}>
                    <Router>
                        <App />
                    </Router>
                </Provider>,
                document.getElementById('root')
            );
        }
    };

    handleBackToSignIn = () => {
        
        ReactDOM.render(
            <Provider store={store}>
                <Router>
                    <App />
                </Router>
            </Provider>,
            document.getElementById('root')
          );
    }

    render() {
        const { classes, loginError, isAuthenticated } = this.props;
        if (isAuthenticated) {
            return <Redirect to="/" />;
        } else {
            return (
            <Container component="main" maxWidth="xs">
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar} style={{marginBottom: 10}}>
                    <AccountCircle />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                    Sign Up
                    </Typography>
                    <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="firstName"
                    label="First Name"
                    name="firstName"
                    onChange={this.handleFirstNameChange}
                    />
                    <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    onChange={this.handleLastNameChange}
                    />
                    <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="birthDate"
                    name="birthDate"
                    type="date"
                    label="Birth Date"
                    onChange={this.handleBirthDateChange}
                    InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    onChange={this.handleEmailChange}
                    />
                    <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    onChange={this.handlePasswordChange}
                    />
                    <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    id="confirmPassword"
                    onChange={this.handleConfirmPasswordChange}
                    />
                    {loginError && (
                    <Typography component="p" className={classes.errorText}>
                        Incorrect email or password.
                    </Typography>
                    )}
                    <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={this.handleRegister}
                    style={{marginTop: 10}}
                    >
                    Sign Up
                    </Button>
                    <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    color="secondary"
                    className={classes.Button}
                    onClick={this.handleBackToSignIn}
                    >Back To Sign In</Button>
                </Paper>
                </Container>
            )
        }
    }
}
    

function mapStateToProps(state) {
    return {
        isLoggingIn: state.auth.isLoggingIn,
        registerError: state.auth.loginError,
        isAuthenticated: state.auth.isAuthenticated
    };
}

// TODO: fix map state to props and state inconsistencies
export default withStyles(styles)(connect(mapStateToProps)(Register));
//export default withStyles(styles)(Register);