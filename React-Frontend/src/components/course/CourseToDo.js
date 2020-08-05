import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link'
import http from '../../api/http';
import utilities from "../../actions/utilities";


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
    http.getCourseAssignments(this.props.match.params.id)
    .then( async (response) => {
      const body = await response.json();
      if (response.status === 200 && body["message"] === "success") {
        for (let a of body["assignments"]) {
          this.setState({
            assignments: [...this.state.assignments, a]
          })
        }
      }
    })
    .catch((e) => {
      console.warn("There was an error getting course assignments: ", e);
    })
  }

  componentDidMount() {
    this.getCourseAssignments();
  }

  render() {
    const { classes } = this.props;

    return (
      <List className={ classes.root }>
  
        <ListItem alignItems="flex-start">
            <ListItemText primary="Upcoming Assignments" />
        </ListItem>
        <Divider component="li" />
  
        { this.state.assignments ? ( 
          this.state.assignments.map(currentAssignment => (
            <ListItem alignItems="flex-start" key={ currentAssignment.id }>
              <Link href={ utilities.generateLinkToAssignment(currentAssignment.courseId, currentAssignment.id) }>
                <ListItemText
                  primary={ currentAssignment.title }
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={ classes.inline }
                        color="textPrimary">
                          { currentAssignment.course }
                        </Typography>
                        <br />
                        { "Due: " + utilities.formatDateTime(currentAssignment.dueDate) }
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