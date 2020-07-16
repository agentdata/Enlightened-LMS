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
import CourseToDo from './CourseToDo'

const drawerWidth = 220;

const styles = theme => ({
    mainDrawer: {
        //zIndex: -1,
        position: "relative",
        height: "100%"
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
                    <ListItem button key="Home" component={Link} to={`/course/${this.props.match.params.id}`}>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItem>
                    <ListItem button key="Assignments" component={Link} to={`/course/${this.props.match.params.id}/course-assignments`}>
                        <ListItemIcon>
                            <AssignmentIcon />
                        </ListItemIcon>
                        <ListItemText primary="Assignments" />
                    </ListItem>
                    <ListItem button key="Grades" component={Link} to={`/course/${this.props.match.params.id}/course-grades`}>
                        <ListItemIcon>
                            <CheckBoxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Grades" />
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem button key="Announcements" component={Link} to={`/course/${this.props.match.params.id}/course-announcements`}>
                        <ListItemIcon>
                            <AnnouncementIcon />
                        </ListItemIcon>
                        <ListItemText primary="Announcements" />
                    </ListItem>
                    <ListItem button key="Discussions" component={Link} to={`/course/${this.props.match.params.id}/course-discussions`}>
                        <ListItemIcon>
                            <ChatIcon />
                        </ListItemIcon>
                        <ListItemText primary="Discussions" />
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem>
                        <CourseToDo match={this.props.match}/>
                    </ListItem>
                </List>
            </div>
            </Drawer>
            
        </div>
        
        );
    }
}

export default withStyles(styles)(CourseSidebar)