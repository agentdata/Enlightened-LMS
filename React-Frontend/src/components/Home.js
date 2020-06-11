import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../actions";
import { withStyles } from "@material-ui/core";
import Profile from "./Profile";
import CourseList from "./course/CourseList"
import Navbar from "./sitewide/Navbar"
import CoursePage from "./course/CoursePage"
import Calendar from "./calendar/Calendar"
import Messages from "./messages/Messages"
import HomeToDo from "./course/HomeToDo"

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
  main: {
    display: "flex",
    flexDirection: "row"
  },
  todo: {
    width: "200px"
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
          <Navbar className={classes.nav}/>
          <div className={classes.main}>
            <HomeToDo className={classes.todo} />
            <Switch>
              <Route path="/" exact component={CourseList} />
              <Route path="/calendar" exact component={Calendar} />
              <Route path="/messages" exact component={Messages} />
              <Route path="/profile" exact component={Profile} />
              <Route path="/course-page" exact component={CoursePage} />
            </Switch>
          </div>
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