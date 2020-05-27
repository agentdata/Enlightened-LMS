import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { loginUser, loginError } from "../actions";
import { withStyles } from "@material-ui/core/styles";
import Register from './Register';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import configureStore from "../configureStore";
import { BrowserRouter as Router } from "react-router-dom";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import LoginSide from '../images/login-side.jpg';

// styles for sign in page
const styles = theme => ({
    root: {
        height: '100vh',
    },
    error: {
        "&.MuiFormHelperText-root.Mui-error" :{
          color: theme.palette.common.white,
        },
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
    errorText: {
        color: "#f50060",
        marginBottom: 5,
        textAlign: "center"
      },
    submit: {
        margin: theme.spacing(3, 0, 2),
    }
});

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const nameRegex = /^[a-zA-Z ]+$/;

class Login extends Component {
    state = { email: "", password: "", emailValidated: false, passwordValidated: false };

    /* #region Text Change Handlers */
    handleEmailChange = ({ target }) => {
        this.setState({ email: target.value });
        this.validateEmail();
    };

    handlePasswordChange = ({ target }) => {
        this.setState({ password: target.value });
        this.validatePassword();
    };
    /* #endregion */

    // handle sign in button
    handleSubmit = () => {

        if (this.state.emailValidated && this.state.passwordValidated) {
            const { dispatch } = this.props;
            console.log("Sign in data VALID");
            const { email, password, } = this.state;
            dispatch(loginUser(email, password));
            this.props.history.push('/');
        } 

    };
    // (emailRegex.test(String(this.state.email).toLowerCase()) && this.state.password != ""); 

    validateEmail = () => {
        this.state.emailValidated = (emailRegex.test(String(this.state.email).toLowerCase()));
    }

    validatePassword = () => {
        this.state.passwordValidated = this.state.password !== "";
    }

    // handle register button
    handleRegister = () => {
        const store = configureStore();
        // render registration page
        ReactDOM.render(
            <Provider store={store}>
                <Router>
                    <Register />
                </Router>
            </Provider>,
            document.getElementById('root')
        );
    }

    // render sign in page
    render() {
        const { classes, loginError /*, isAuthenticated */} = this.props;
        return (
            <Grid container component="main" className={classes.root}>
                <CssBaseline />
                <Grid item xs={false} sm={4} md={7} className={classes.image} />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h2" variant="h5">
                            Sign in
                    </Typography>
                        <form className={classes.form} noValidate>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                error = {!this.state.emailValidated && this.state.email !== ""}
                                helperText = {!this.state.emailValidated && this.state.email !== "" ? "Enter a valid email" : ""}
                                autoComplete="email"
                                autoFocus
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
                            {loginError && (
                            <Typography component="p" className={classes.errorText}>
                                Incorrect email or password.
                            </Typography>
                            )}
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                color="primary"
                                
                                className={classes.submit}
                                onClick={this.handleSubmit}
                                style={{ marginTop: 10 }}
                            >
                                Sign In
                    </Button>
                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                color="secondary"
                                className={classes.Button}
                                onClick={this.handleRegister}
                                style={{ backgroundColor: '#e53935', marginBottom: 10 }}
                            >Register
                    </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                        </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </Grid>
            </Grid>
        );
    }
}

// update states
function mapStateToProps(state) {
    return {
        isLoggingIn: state.auth.isLoggingIn,
        loginError: state.auth.loginError,
        isAuthenticated: state.auth.isAuthenticated
    };
}

// TODO: fix map state to props and state inconsistencies
export default withStyles(styles)(connect(mapStateToProps)(Login));
// export default withStyles(styles)(Login);