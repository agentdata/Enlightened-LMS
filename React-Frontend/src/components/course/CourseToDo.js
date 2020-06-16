import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link'

const state = {
  isLoggedIn: false,
  assignments: [
      {
          title: 'Assignment 3',
          course: 'CS 3100',
          due: '2020-06-13T23:59:59Z',
          link: 'http://www.google.com'
      },
      {
          title: 'Quiz 3',
          course: 'CS 3260',
          due: '2020-06-14T23:59:59Z',
          link: 'link to assignment'
      },
      {
          title: 'Assignment 4',
          course: 'CS 3260',
          due: '2020-06-16T23:59:59Z',
          link: 'link to assignment'
      }
  ]
};

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: '220px',
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    left: "-15px"
  },
  inline: {
    display: 'inline',
  },
}));

export default function HomeToDo() {
  const classes = useStyles();

  return (
    <List className={classes.root}>

      <ListItem alignItems="flex-start">
          <ListItemText primary="Upcoming Assignments" />
      </ListItem>
      <Divider component="li" />

      {state.assignments ? ( 
        state.assignments.map(currentAssignment => (
          <ListItem alignItems="flex-start">
            <Link href={currentAssignment.link}>
              <ListItemText
                primary={currentAssignment.title}
                secondary={
                  <React.Fragment>
                    <Typography
                      comopnent="span"
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
              <Divider component="li" />
            </Link>
          </ListItem>
        ))
        
      ) : <div>No upcoming assignments</div>
    }
    </List>
  );
}