import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link'
import http from '../../api/http';

// const state = {
//   isLoggedIn: false,
//   assignments: [
//       {
//           title: 'Assignment 3',
//           course: 'CS 3100',
//           due: '2020-06-13T23:59:59Z',
//           link: 'http://www.google.com'
//       },
//       {
//           title: 'Quiz 3',
//           course: 'CS 3260',
//           due: '2020-06-14T23:59:59Z',
//           link: 'link to assignment'
//       },
//       {
//           title: 'Assignment 4',
//           course: 'CS 3260',
//           due: '2020-06-16T23:59:59Z',
//           link: 'link to assignment'
//       }
//   ]
// };

const styles = theme => ({
  root: {
    minWidth: '220px',
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    left: "-15px"
  },
  inline: {
    display: 'inline',
  },
});

class CourseToDo extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
        isLoggedIn: false,
        assignments: []
      };
  }

  getCourseAssignments() {
    http.getCourseAssignments()
    .then( async (response) => {
      const body = await response.json();
      if (response.status === 200 && body["message"] === "success") {
        console.log(body)
        var assignments = [];
        for (let a in body["assignments"]) {
          this.setState({
            assignments: [...this.state.assignments, a]
          })
        }
      }
    })
  }

  componentDidMount() {
    this.getCourseAssignments();
    console.log(this.state.assignments);
  }

  render() {
    const { classes } = this.props;

    return (
      <List className={classes.root}>
  
        <ListItem alignItems="flex-start">
            <ListItemText primary="Upcoming Assignments" />
        </ListItem>
        <Divider component="li" />
  
        {this.state.assignments ? ( 
          this.state.assignments.map(currentAssignment => (
            <ListItem alignItems="flex-start" key={currentAssignment.title + " " + currentAssignment.due}>
              <Link href={currentAssignment.link}>
                <ListItemText
                  primary={currentAssignment.title}
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary">
                          {currentAssignment.course}
                        </Typography>
                        <br />
                        {"Due: " + currentAssignment.due}
                    </React.Fragment>
                  }
                  />
                <Divider />
              </Link>
            </ListItem>
          ))
          
        ) : <div>No upcoming assignments</div>
      }
      </List>
    );
    }
}

export default withStyles(styles)(CourseToDo);