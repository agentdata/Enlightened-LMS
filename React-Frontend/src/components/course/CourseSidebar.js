import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home'
import AssignmentIcon from '@material-ui/icons/Assignment'
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import AnnouncementIcon from '@material-ui/icons/Announcement'
import ChatIcon from '@material-ui/icons/Chat'

const drawerWidth = 240;

const styles = theme => ({
    mainDrawer: {
        //zIndex: -1,
        position: "relative",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerContainer: {
      overflow: 'hidden',
    },
    content: {
      flexGrow: 0,
      padding: theme.spacing(3),
    },
  });
  
  class CourseSidebar extends Component {

    render() {
        const { classes } = this.props;
        return (
        <div className={classes.mainDrawer}>
            <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
                paper: classes.drawerPaper,
            }}
            >
            <Toolbar />
            <div className={classes.drawerContainer}>
                <List>
                    <Link to="course-page" style={{textDecoration: 'none'}}>
                        <ListItem button key="Home">
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText primary="Home" />
                        </ListItem>
                    </Link>
                    <Link to="course-assignments" style={{textDecoration: 'none'}}>
                        <ListItem button key="Assignments">
                            <ListItemIcon>
                                <AssignmentIcon />
                            </ListItemIcon>
                            <ListItemText primary="Assignments" />
                        </ListItem>
                    </Link>
                    <Link to="course-grades" style={{textDecoration: 'none'}}>
                        <ListItem button key="Grades">
                            <ListItemIcon>
                                <CheckBoxIcon />
                            </ListItemIcon>
                            <ListItemText primary="Grades" />
                        </ListItem>
                    </Link>
                </List>
                <Divider />
                <List>
                    <Link to="course-announcements" style={{textDecoration: 'none'}}>
                        <ListItem button key="Announcements">
                            <ListItemIcon>
                                <AnnouncementIcon />
                            </ListItemIcon>
                            <ListItemText primary="Announcements" />
                        </ListItem>
                    </Link>
                    <Link to="course-discussions" style={{textDecoration: 'none'}}>
                        <ListItem button key="Discussions">
                            <ListItemIcon>
                                <ChatIcon />
                            </ListItemIcon>
                            <ListItemText primary="Discussions" />
                        </ListItem>
                    </Link>
                </List>
            </div>
            </Drawer>
        </div>
        );
    }
}

export default withStyles(styles)(CourseSidebar)