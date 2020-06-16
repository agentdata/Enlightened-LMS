import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link'

const state = {
    notifications: [
        {
            title: "New comment for \"Assignment 4 Fork Help\"",
            course: "CS 3100",
            date: "06/13/20",
            time: "11:51pm",
            link: "link to discussion"
        },
        {
            title: "Assignment 4 due date changed",
            course: "CS 3100",
            date: "06/13/20",
            time: "11:45pm",
            link: "link to assignment"
        },
        {
            title: "Assignment 4 graded",
            course: "CS 3260",
            date: "06/13/20",
            time: "11:30pm",
            link: "link to assignment"
        }
    ]
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  title: {
      whiteSpace: "normal"
  }
}));

export default function AlignItemsList() {
  const classes = useStyles();

  return (
    <List className={classes.root}>
        {state.notifications ? (
            state.notifications.map(currentNotification => (
                <div key={currentNotification.title + " " + currentNotification.course}>
                <ListItem alignItems="flex-start">
                    <Link href={currentNotification.link}>
                        <ListItemText className={classes.title}
                            primary={currentNotification.title}
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        className={classes.inline}
                                        color="textPrimary"
                                        >
                                            {currentNotification.course}
                                        </Typography>
                                        <br />
                                        {currentNotification.date + " | " + currentNotification.time}
                                    </React.Fragment>
                                }
                            />
                    </Link>
                </ListItem>
                <Divider />
                </div>
            ))
        ) : <div>No notifications</div>
        }
    </List>
  );
}