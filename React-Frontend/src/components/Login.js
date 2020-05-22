import React, { Component } from "react";
import { connect } from "react-redux";
import {Redirect} from "react-router-dom";
import { loginUser } from "../actions";
import { withStyles } from "@material-ui/styles";
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
import Container from "@material-ui/core/Container";

// styles for sign in page
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

class Login extends Component {
    state = { email: "", password: "" };

    /* #region Text Change Handlers */
    handleEmailChange = ({ target }) => {
        this.setState({ email: target.value });
    };

    handlePasswordChange = ({ target }) => {
        this.setState({ password: target.value });
    };
    /* #endregion */

    // handle sign in button
    handleSubmit = () => {
        const { dispatch } = this.props;
        const { email, password } = this.state;
        dispatch(loginUser(email, password));
        this.props.history.push('/');
    };

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
        const { classes, loginError, isAuthenticated } = this.props;
        if (isAuthenticated) {
            return <Redirect to="/" />;
        } else {
            return (
            <Container component="main" maxWidth="xs">
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar} style={{marginBottom: 10}}>
                    <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                    Sign in
                    </Typography>
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
                    onClick={this.handleSubmit}
                    style={{marginTop: 10}}
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
                    >Register</Button>
                </Paper>
            </Container>
            )
        }
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