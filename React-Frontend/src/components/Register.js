import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { registerUser } from "../actions";
import { withStyles } from "@material-ui/core/styles";
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
import LoginSide from '../images/login-side.jpg';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';

const styles = theme => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: "url(" + LoginSide + ")",
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: '#e53935'
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    }
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
        var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        var nameRegex = /^[a-zA-Z ]+$/;

        // Grab today's day and format it to yyyy/mm/dd
        var currentDate = new Date();
        var year = String(currentDate.getFullYear());
        var month = String(currentDate.getMonth() + 1).padStart(2, 0);
        var day = String(currentDate.getDate()).padStart(2, 0);
        currentDate = year + '-' + month + '-' + day;

        if (nameRegex.test(String(this.state.firstName).toLowerCase()) && nameRegex.test(String(this.state.lastName).toLowerCase()) &&
            this.state.birthDate != "" && this.state.birthDate < currentDate &&
            emailRegex.test(String(this.state.email).toLowerCase()) &&
            this.state.password == this.state.confirmPassword)
        {
            console.log("Registration data VALID");

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
        const { classes, isAuthenticated } = this.props;
        return (
            <Grid container component="main" className={classes.root}>
                <CssBaseline />
                <Grid item xs={false} sm={4} md={7} className={classes.image} />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <AccountCircle />
                        </Avatar>
                        <Typography component="h2" variant="h5">
                            Sign in
                    </Typography>
                        <form className={classes.form} noValidate>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                required
                                autoFocus
                                id="firstName"
                                label="First Name"
                                name="firstName"
                                onChange={this.handleFirstNameChange}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                required
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                onChange={this.handleLastNameChange}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                required
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
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onChange={this.handleEmailChange}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={this.handlePasswordChange}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="confirmPassword"
                                label="Confirm Password"
                                type="password"
                                id="confirmPassword"
                                autoComplete="current-password"
                                onChange={this.handleConfirmPasswordChange}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={this.handleRegister}
                                style={{ marginTop: 10 }}
                            >
                                Register
                    </Button>
                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                color="secondary"
                                className={classes.Button}
                                onClick={this.handleBackToSignIn}
                                style={{ backgroundColor: '#e53935', marginBottom: 10 }}
                            >Back To Sign In
                    </Button>
                        </form>
                    </div>
                </Grid>
            </Grid>
        );
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