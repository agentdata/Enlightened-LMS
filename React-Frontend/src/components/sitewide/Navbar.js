import React from 'react';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
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
  }));

// const preventDefault = (event) => event.preventDefault();

const Navbar = () => {
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
  
    const menuId = 'navbar';

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <Link to="profile" style={{textDecoration: 'none'}}>
          <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        </Link>
        <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
      </Menu>
    );
  
    const mobileMenuId = 'navbar-mobile';
    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        <MenuItem>
          <IconButton color="inherit">
            <Badge color="secondary">
              <DashboardIcon />
            </Badge>
          </IconButton>
          <p>Courses</p>
        </MenuItem>
        <MenuItem>
          <IconButton color="inherit">
            <Badge color="secondary">
              <DateRangeIcon/>
            </Badge>
          </IconButton>
          <p>Calendar</p>
        </MenuItem>
        <MenuItem>
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
                  <Tooltip title="Courses" arrow>
                    <Link to="course-list">
                      <IconButton color="inherit">
                          <Badge color="secondary">
                            <DashboardIcon />
                          </Badge>
                      </IconButton>
                    </Link>
                  </Tooltip>
                  <Tooltip title="Calendar" arrow>
                    <Link to="calendar" style={{textDecoration: 'none'}}>
                      <IconButton color="inherit">
                          <Badge color="secondary">
                            <DateRangeIcon/>
                          </Badge>
                      </IconButton>
                    </Link>
                  </Tooltip>
                  <Tooltip title="Messages" arrow>
                    <Link to="messages" style={{textDecoration: 'none'}}>
                      <IconButton color="inherit">
                        <Badge color="secondary">
                          <MailIcon />
                        </Badge>
                      </IconButton>
                    </Link>
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

export default Navbar;
