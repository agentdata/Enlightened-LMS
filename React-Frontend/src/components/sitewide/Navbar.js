import React from 'react';
import {BrowserRouter as Router, Link} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from "@material-ui/core/styles";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import DashboardIcon from '@material-ui/icons/Dashboard';
import DateRangeIcon from '@material-ui/icons/DateRange';
import MoreIcon from '@material-ui/icons/MoreVert';
import Tooltip from '@material-ui/core/Tooltip';
import {logoutUser, registerUser} from "../../actions";
import ReactDOM from "react-dom";
import {connect, Provider} from "react-redux";
import App from "../../App";
import configureStore from "../../configureStore";

const useStyles = makeStyles((theme) => ({
    grow: {
      flexGrow: 1,
      position: "relative",
      zIndex: 9999
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    dropdown: {
      marginTop: "42px"
    }
  }));

// const preventDefault = (event) => event.preventDefault();
const store = configureStore();

const Navbar = (props) => {
    const {dispatch} = props;
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  
    const handleProfileMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleMobileMenuClose = () => {
      setMobileMoreAnchorEl(null);
    };
  
    const handleMenuClose = () => {
      setAnchorEl(null);
      handleMobileMenuClose();
    };
  
    const handleMobileMenuOpen = (event) => {
      setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleLogout = () => {
       // const { dispatch } = this.props;
        dispatch(logoutUser());

        ReactDOM.render(
            <Provider store={store}>
                <Router>
                    <App />
                </Router>
            </Provider>,
            document.getElementById('root')
        );
    }
  
    const menuId = 'navbar';

    const renderMenu = (
      <Menu className={classes.dropdown}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >

        <MenuItem onClick={handleMenuClose} to="profile" component={Link}>Profile</MenuItem>

        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    );
  
    const mobileMenuId = 'navbar-mobile';
    const renderMobileMenu = (
      <Menu className={classes.dropdown}
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        <MenuItem component={Link} to="/">
          <IconButton color="inherit">
            <Badge color="secondary">
              <DashboardIcon />
            </Badge>
          </IconButton>
          <p>Courses</p>
        </MenuItem>
        <MenuItem component={Link} to="calendar">
          <IconButton color="inherit">
            <Badge color="secondary">
              <DateRangeIcon/>
            </Badge>
          </IconButton>
          <p>Calendar</p>
        </MenuItem>
        <MenuItem component={Link} to="messages">
          <IconButton color="inherit">
            <Badge color="secondary">
              <MailIcon />
            </Badge>
          </IconButton>
          <p>Messages</p>
        </MenuItem>
        <MenuItem>
          <IconButton color="inherit">
            <Badge color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    );
  
    return (
        <div className={classes.grow}>
          <AppBar position="static">
            <Toolbar>
              <Typography className={classes.title} variant="h6" noWrap>
                Enlightened
              </Typography>
              <div className={classes.grow} />
              <div className={classes.sectionDesktop}>
                  <Tooltip title="Courses" arrow component={Link} to="/">
                    <IconButton color="inherit">
                        <Badge color="secondary">
                          <DashboardIcon />
                        </Badge>
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Calendar" arrow component={Link} to="calendar">
                    <IconButton color="inherit">
                        <Badge color="secondary">
                          <DateRangeIcon/>
                        </Badge>
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Messages" arrow component={Link} to="messages">
                    <IconButton color="inherit">
                      <Badge color="secondary">
                        <MailIcon />
                      </Badge>
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Notifications" arrow>
                    <IconButton color="inherit">
                      <Badge color="secondary">
                          <NotificationsIcon />
                      </Badge>
                  </IconButton>
                  </Tooltip>
                  <Tooltip title="Profile" arrow>
                    <IconButton
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                  </Tooltip>
              </div>
              <div className={classes.sectionMobile}>
                <IconButton
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                >
                  <MoreIcon />
                </IconButton>
              </div>
            </Toolbar>
          </AppBar>
          {renderMobileMenu}
          {renderMenu}
        </div>
    );
}
function mapStateToProps(state) {
    return {
        isLoggingIn: state.auth.isLoggingIn,
        registerError: state.auth.loginError,
        isAuthenticated: state.auth.isAuthenticated
    };
}
export default withStyles(useStyles)(connect(mapStateToProps)(Navbar));
