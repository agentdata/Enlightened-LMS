import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "25px",
    marginLeft: "25px",
    minWidth: '220px',
    backgroundColor: theme.palette.background.paper,
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
      <ListItem alignItems="flex-start">
        <ListItemText
          primary="Assignment 3"
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                CS 3100
              </Typography>
              <br />
              {"Due: 06/13/2020 at 11:59pm"}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider component="li" />
      <ListItem alignItems="flex-start">
        <ListItemText
          primary="Quiz 3"
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                CS 3260
              </Typography>
              <br />
              {"Due: 06/14/2020 at 11:59pm"}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider component="li" />
      <ListItem alignItems="flex-start">
        <ListItemText
          primary="Assignment 4"
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                CS 3260
              </Typography>
              <br />
              {"Due: 06/16/2020 at 11:59pm"}
            </React.Fragment>
          }
        />
      </ListItem>
    </List>
  );
}