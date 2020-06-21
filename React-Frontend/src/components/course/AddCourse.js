import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles"
import { Typography, Button, List, ListItem, 
        TextField, MenuItem } from '@material-ui/core';

const styles = theme => ({
    verticalFlex: {
        display: "flex",
        flexDirection: "column",
        color: "rgba(0, 0, 0, 0.54);"
    },
    horizontalFlex: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    eighths: {
        width: "10%"
    },
    thirds: {
        width: "30%"
    },
    quarters: {
        width: "25%"
    },
    title: {
        display: "flex",
        flexDirection: "column",
        paddingTop: "10px",
        textAlign: "center",
        color: "#3f51b5",
        borderBottom: "2px solid #3f51b5",
        marginBottom: "10px"
    },
    dayTitle: {
        padding: "8px"
    },
    dayButton: {
        borderRadius: "3px",
        border: "1px solid rgba(0, 0, 0, 0.54)",
        minWidth: "50px",
        width: "55px",
        fontSize: "12px"
    },
    dayButtonSelected: {
        borderRadius: "3px",
        border: "1px solid rgba(0, 0, 0, 0.54)",
        backgroundColor: "#80e2a7",
        minWidth: "50px",
        width: "55px",
        fontSize: "12px",
        '&:hover': {
            backgroundColor: "#57ad79"
        }
    },
    daysFlex: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "wrap"
    },
    timesFlex: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: "20px",
        marginBottom: "10px"
    },
    buttons: {
        display: "flex",
        justifyContent: "space-around"
    },
    modalButton: {
        paddingRight: "12px",
        paddingLeft: "12px"
    }
})

class AddCourse extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isInstructor: true,
            newCourse:
                {
                    department: '', // CS, PHIL, etc.
                    number: '', // 2300, 1410, etc.
                    name: '', // full course name
                    description: '', // brief description
                    credits: '', // number of credits
                    semester: '', // fall, summer, spring
                    year: '', // 2020
                    block: '', // first, second, full
                    days: {
                        mon: false,
                        tues: false,
                        wed: false,
                        thurs: false,
                        fri: false,
                        sat: false,
                        sun: false
                    }, // days of week: [monday, tuesday, etc.]
                    startTime: '',
                    endTime: '',
                    platform: '', // online, face-to-face, hybrid
                    building: '',
                    roomNumber: '',
                    capacity: '', // total students allowed
                    instructor: '', // automatically fill
                }
    
                // 5 - Frontend Courses - instructor can add a course - 
                // includes title, number, dates, times, location, capacity, 
                // instructor, credit hours - Justin
        };
    }
    

    getLoggedIn = async () => {
        // check if user logged in, set state accordingly
    }

    componentDidMount() {
        this.getLoggedIn();
    }

    handleDepartmentChange = ({ target }) => {
        this.setState({ newCourse: { ...this.state.newCourse, department: target.value} }, () => {
            this.showDays()
        })
        console.log(this.state.newCourse.department)
    }

    handleNumberChange = ({ target }) => {
        this.setState({ newCourse: { ...this.state.newCourse, number: target.value} })
    }

    handleNameChange = ({ target }) => {
        this.setState({ newCourse: { ...this.state.newCourse, name: target.value} })
    }

    handleDescriptionChange = ({ target }) => {
        this.setState({ newCourse: { ...this.state.newCourse, description: target.value} })
    }

    handleCreditsChange = ({ target }) => {
        this.setState({ newCourse: { ...this.state.newCourse, credits: target.value} })
    }

    handleSemesterChange = ({ target }) => {
        this.setState({ newCourse: { ...this.state.newCourse, semester: target.value} })
    }

    handleYearChange = ({ target }) => {
        this.setState({ newCourse: { ...this.state.newCourse, year: target.value} })
    }

    handleBlockChange = ({ target }) => {
        this.setState({ newCourse: { ...this.state.newCourse, block: target.value} })
    }

    toggleMonday = () => {
        this.setState({ newCourse: { ...this.state.newCourse, days: { ...this.state.newCourse.days, mon: !this.state.newCourse.days.mon }}}, () => { this.showDays() })
    }

    toggleTuesday = () => {
        this.setState({ newCourse: { ...this.state.newCourse, days: { ...this.state.newCourse.days, tues: !this.state.newCourse.days.tues }}}, () => { this.showDays() })
    }

    toggleWednesday = () => {
        this.setState({ newCourse: { ...this.state.newCourse, days: { ...this.state.newCourse.days, wed: !this.state.newCourse.days.wed }}}, () => { this.showDays() })
    }

    toggleThursday = () => {
        this.setState({ newCourse: { ...this.state.newCourse, days: { ...this.state.newCourse.days, thurs: !this.state.newCourse.days.thurs }}}, () => { this.showDays() })
    }

    toggleFriday = () => {
        this.setState({ newCourse: { ...this.state.newCourse, days: { ...this.state.newCourse.days, fri: !this.state.newCourse.days.fri }}}, () => { this.showDays() })
    }

    toggleSaturday = () => {
        this.setState({ newCourse: { ...this.state.newCourse, days: { ...this.state.newCourse.days, sat: !this.state.newCourse.days.sat }}}, () => { this.showDays() })
    }

    toggleSunday = () => {
        this.setState({ newCourse: { ...this.state.newCourse, days: { ...this.state.newCourse.days, sun: !this.state.newCourse.days.sun }}}, () => { this.showDays() })
    }

    handleStartTimeChange = ({ target }) => {
        this.setState({ newCourse: { ...this.state.newCourse, startTime: target.value} })
    }

    handleEndTimeChange = ({ target }) => {
        this.setState({ newCourse: { ...this.state.newCourse, endTime: target.value} })
    }

    handlePlatformChange = ({ target }) => {
        this.setState({ newCourse: { ...this.state.newCourse, platform: target.value} })
    }

    handleBuildingChange = ({ target }) => {
        this.setState({ newCourse: { ...this.state.newCourse, building: target.value} })
    }

    handleRoomChange = ({ target }) => {
        this.setState({ newCourse: { ...this.state.newCourse, roomNumber: target.value} })
    }

    handleCapacityChange = ({ target }) => {
        this.setState({ newCourse: { ...this.state.newCourse, capacity: target.value} })
    }

    submitButtonPressed = () => {
        console.log("button pressed")
        // TODO: Add course with api
    }

    showDays = () => {
        console.log("Monday: " + this.state.newCourse.days.mon)
        console.log("Tuesday: " + this.state.newCourse.days.tues)
        console.log("Wednesday: " + this.state.newCourse.days.wed)
        console.log("Thursday: " + this.state.newCourse.days.thurs)
        console.log("Friday: " + this.state.newCourse.days.fri)
        console.log("Saturday: " + this.state.newCourse.days.sat)
        console.log("Sunday: " + this.state.newCourse.days.sun)
    }

    render() {
        const { classes } = this.props

        return (
            <div className={classes.verticalFlex}>
                <div className={classes.title}>
                    <Typography variant="h5">Add New Course</Typography>
                </div>
                <div className={classes.horizontalFlex}>
                    <TextField
                    id="department"
                    label="Department"
                    style={{ margin: 8 }}
                    helperText="CS, HIST, etc"
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={this.handleDepartmentChange}
                    />
                    <TextField
                    id="number"
                    label="Number"
                    style={{ margin: 8 }}
                    helperText="1410, 2300, etc."
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={this.handleNumberChange}
                    />
                </div>
                <TextField
                id="name"
                label="Name"
                style={{ margin: 8 }}
                helperText="Full Course Name"
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={this.handleNameChange}
                />
                <TextField
                id="description"
                label="Description"
                style={{ margin: 8 }}
                helperText="Brief Course Description"
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={this.handleDescriptionChange}
                />
                <div className={classes.horizontalFlex}>
                    <TextField
                    className={classes.eighths}
                    id="credits"
                    label="Credits"
                    style={{ margin: 8 }}
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={this.handleCreditsChange}
                    />
                    <TextField
                    className={classes.quarters}
                    id="semester"
                    label="Semester"
                    style={{ margin: 8 }}
                    select
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={this.handleCreditsChange}
                    >
                        <MenuItem key="fall" value="fall">
                            Fall
                        </MenuItem>
                        <MenuItem key="summer" value="summer">
                            Summer
                        </MenuItem>
                        <MenuItem key="spring" value="spring">
                            Spring
                        </MenuItem>
                    </TextField>
                    <TextField
                    className={classes.quarters}
                    id="year"
                    label="Year"
                    style={{ margin: 8 }}
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={this.handleYearChange}
                    />
                    <TextField
                    className={classes.quarters}
                    id="block"
                    label="Block"
                    style={{ margin: 8 }}
                    select
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={this.handleBlockChange}
                    >
                        <MenuItem key="first" value="first">
                            First
                        </MenuItem>
                        <MenuItem key="second" value="second">
                            Second
                        </MenuItem>
                        <MenuItem key="full" value="full">
                            Full
                        </MenuItem>
                    </TextField>
                </div>
                <Typography variant="body1" className={classes.dayTitle}>Days of the Week</Typography>
                <div className={classes.daysFlex}>
                    <Button onClick={this.toggleMonday}
                    className={this.state.newCourse.days.mon ? classes.dayButtonSelected : classes.dayButton}>
                        Mon
                    </Button>
                    <Button onClick={this.toggleTuesday}
                    className={this.state.newCourse.days.tues ? classes.dayButtonSelected : classes.dayButton}>
                        Tues
                    </Button>
                    <Button onClick={this.toggleWednesday}
                    className={this.state.newCourse.days.wed ? classes.dayButtonSelected : classes.dayButton}>
                        Wed
                    </Button>
                    <Button onClick={this.toggleThursday}
                    className={this.state.newCourse.days.thurs ? classes.dayButtonSelected : classes.dayButton}>
                        Thurs
                    </Button>
                    <Button onClick={this.toggleFriday}
                    className={this.state.newCourse.days.fri ? classes.dayButtonSelected : classes.dayButton}>
                        Fri
                    </Button>
                    <Button onClick={this.toggleSaturday}
                    className={this.state.newCourse.days.sat ? classes.dayButtonSelected : classes.dayButton}>
                        Sat
                    </Button>
                    <Button onClick={this.toggleSunday}
                    className={this.state.newCourse.days.sun ? classes.dayButtonSelected : classes.dayButton}>
                        Sun
                    </Button>
                </div>
                <div className={classes.timesFlex}>
                    <TextField
                    id="startTime"
                    label="Start Time"
                    type="time"
                    className={classes.thirds}
                    style={{ margin: 8 }}
                    InputLabelProps={{
                    shrink: true,
                    }}
                    inputProps={{
                    step: 300, // 5 min
                    }}
                    onChange={this.handleStartTimeChange}
                    />
                    <TextField
                    id="endTime"
                    label="End Time"
                    type="time"
                    className={classes.thirds}
                    style={{ margin: 8 }}
                    InputLabelProps={{
                    shrink: true,
                    }}
                    inputProps={{
                    step: 300, // 5 min
                    }}
                    onChange={this.handleEndTimeChange}
                    />
                    <TextField
                    className={classes.thirds}
                    style={{ margin: 8 }}
                    id="platform"
                    label="Platform"
                    style={{ margin: 8 }}
                    select
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={this.handlePlatformChange}
                    >
                        <MenuItem key="online" value="online">
                            Online
                        </MenuItem>
                        <MenuItem key="hybrid" value="hybrid">
                            Hybrid
                        </MenuItem>
                        <MenuItem key="inPerson" value="inPerson">
                            In Person
                        </MenuItem>
                    </TextField>

                </div>

                <div className={classes.horizontalFlex}>
                    <TextField
                    disabled={this.state.newCourse.platform === "online" ? true : false}
                    id="building"
                    label="Building"
                    style={{ margin: 8 }}
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={this.handleBuildingChange}
                    />
                    <TextField
                    className={classes.quarters}
                    disabled={this.state.newCourse.platform === "online" ? true : false}
                    id="roomNumber"
                    label="Room #"
                    style={{ margin: 8 }}
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={this.handleRoomChange}
                    />
                    <TextField
                    className={classes.quarters}
                    disabled={this.state.newCourse.platform === "online" ? true : false}
                    id="capacity"
                    label="Capacity"
                    style={{ margin: 8 }}
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={this.handleCapacityChange}
                    />
                </div>

                <List>
                    <ListItem className={classes.buttons}>
                        <Button className={classes.modalButton} onClick={this.props.closeModal}>Cancel</Button>
                        <Button className={classes.modalButton} onClick={this.submitButtonPressed}>Add Course</Button>
                    </ListItem>
                </List>
            </div>
            
        );
    }
}

export default withStyles(styles)(AddCourse);
