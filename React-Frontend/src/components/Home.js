import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../actions";
import { withStyles } from "@material-ui/core";
import Profile from "./Profile";
import CourseList from "./course/CourseList"
import Navbar from "./sitewide/Navbar"
import CoursePage from "./course/CoursePage"
import Calendar from "./calendar/Calendar"
import Messages from "./messages/Messages"

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import AlternateEmail from "@material-ui/icons/AlternateEmail";
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
  }
});

class Home extends Component {
  handleLogout = () => {
    const { dispatch } = this.props;
    dispatch(logoutUser());

  };
  render() {
    const { classes } = this.props;
    return (
        
      <Router>
        <div>
          <Navbar />
          <Switch>
            <Route path="/course-list" exact component={CourseList} />
            <Route path="/calendar" exact component={Calendar} />
            <Route path="/messages" exact component={Messages} />
            <Route path="/profile" exact component={Profile} />
          </Switch>
        </div>
      </Router>

      // <Container component="main" maxWidth="xs">
      //   <Profile></Profile>
      //   <Paper className={classes.paper}>
      //     <Avatar className={classes.avatar} style={{marginBottom: 10}}>
      //     <AlternateEmail />
      //     </Avatar>
      //     <Typography component="h1" variant="h5" align="center">
      //     Hello! Please check your email to confirm your account.
      //     </Typography>
      //     <Button
      //     type="button"
      //     fullWidth
      //     variant="contained"
      //     color="primary"
      //     className={classes.submit}
      //     onClick={this.handleResendEmail}
      //     style={{marginTop: 10}}
      //     >
      //     Re-Send Email
      //     </Button>
      //     <Button
      //     type="button"
      //     fullWidth
      //     variant="contained"
      //     color="secondary"
      //     className={classes.Button}
      //     onClick={this.handleLogout}
      //     >Sign Out</Button>
      //   </Paper>
      // </Container>
    );
    
  }
}
function mapStateToProps(state) {
  return {
    isLogginIn: state.auth.isLoggingIn,
    isLoggingOut: state.auth.isLoggingOut,
    logoutError: state.auth.logoutError
  };
}
export default withStyles(styles)(connect(mapStateToProps)(Home));