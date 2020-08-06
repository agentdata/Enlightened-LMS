import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link'
import http from "../api/http";
import utilities from "../actions/utilities";

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
    },
    clearButton: {
        border: 'none',
        backgroundColor: theme.palette.primary.contrastText,
        margin: 'auto',
        padding: '10px',
    },
    clearIcon: {
        fontSize: "x-large",
        color: theme.palette.primary.light,
    }
}));

export default function AlignItemsList() {
    const classes = useStyles();

    const [notifications, setNotifications] = React.useState([]);
    const [notificationClicked, setNotificationClicked] = React.useState({id: -1});

    useEffect(() => {
        var fetchedNotifications = []
        http.getUserNotifications()
            .then( async (response) => {
                const body = await response.json();
                if (response.status === 200 && body["message"] === "success") {
                    fetchedNotifications = body["newNotifications"];
                }
                setNotifications(fetchedNotifications)
            })
            .catch((e) => {
                console.warn("There was an error retrieving notifications: ", e);
            })

    }, [notificationClicked]);

    const clearNotification = (currentNotification) => {
        http.clearUserNotification(currentNotification.id)
            .then( async (response) => {
                const data = await response.json();
                if (response.status === 200 && data["message"] === "success") {
                    setNotifications(notifications.filter((value, index, arr)=>{return value.id !== currentNotification.id;}))
                }
            })
            .catch((e) => {
                console.warn("There was an error retrieving notifications: ", e);
            })
    }

    return (
        <List className={classes.root}>
            {notifications.length > 0 ? (
                notifications.map(currentNotification => (
                    <div key={ currentNotification.id }>
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
                                                {currentNotification.courseName}
                                            </Typography>
                                            <br />
                                            { utilities.formatDateTime(currentNotification.timestamp) }
                                        </React.Fragment>
                                    }
                                />
                        </Link>
                        <button type="button" className={classes.clearButton} onClick={() => clearNotification(currentNotification)} >
                            <span className={classes.clearIcon}>&times;</span>
                        </button>
                    </ListItem>
                    <Divider />
                    </div>
                ))
            ) : <div>
                    <ListItem alignItems="flex-start">
                        <ListItemText className={classes.title} primary="No Notifications"/>
                    </ListItem>
                </div>
            }
        </List>
    );
}