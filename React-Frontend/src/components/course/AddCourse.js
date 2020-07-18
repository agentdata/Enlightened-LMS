import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles"
import { Typography, Button, List, ListItem, 
        TextField, MenuItem } from '@material-ui/core';
import http from '../../api/http';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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
    halfs: {
        width: "45%"
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
    daysError: {
        textAlign: "center",
        color: "#f44336",
        fontWeight: "initial",
        fontSize: "15px",
        marginTop: "5px"
    },
    timesFlex: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: "5px",
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
            newCourse:
                {
                    department: '', // CS, PHIL, etc.
                    number: '', // 2300, 1410, etc.
                    name: '', // full course name
                    description: '', // brief description
                    credits: '', // number of credits
                    semester: 'Fall', // fall, summer, spring
                    year: '', // 2020
                    block: 'Full', // first, second, full
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
                    platform: 'In Person', // online, face-to-face, hybrid
                    building: '',
                    roomNumber: '',
                    capacity: '', // total students allowed
                    instructor: '', // automatically fill
                },
            departmentError: '',
            numberError: '',
            nameError: '',
            descriptionError: '',
            creditsError: '',
            yearError: '',
            daysError: '',
            startTimeError: '',
            endTimeError: '',
            buildingError: '',
            roomError: '',
            capacityError: '',
            confirmDialogOpen: false
    
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
        this.setState({ newCourse: { ...this.state.newCourse, department: target.value} })
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
        this.setState({ newCourse: { ...this.state.newCourse, days: { ...this.state.newCourse.days, mon: !this.state.newCourse.days.mon }}}, () => { this.validateDays() })
    }

    toggleTuesday = () => {
        this.setState({ newCourse: { ...this.state.newCourse, days: { ...this.state.newCourse.days, tues: !this.state.newCourse.days.tues }}}, () => { this.validateDays() })
    }

    toggleWednesday = () => {
        this.setState({ newCourse: { ...this.state.newCourse, days: { ...this.state.newCourse.days, wed: !this.state.newCourse.days.wed }}}, () => { this.validateDays() })
    }

    toggleThursday = () => {
        this.setState({ newCourse: { ...this.state.newCourse, days: { ...this.state.newCourse.days, thurs: !this.state.newCourse.days.thurs }}}, () => { this.validateDays() })
    }

    toggleFriday = () => {
        this.setState({ newCourse: { ...this.state.newCourse, days: { ...this.state.newCourse.days, fri: !this.state.newCourse.days.fri }}}, () => { this.validateDays() })
    }

    toggleSaturday = () => {
        this.setState({ newCourse: { ...this.state.newCourse, days: { ...this.state.newCourse.days, sat: !this.state.newCourse.days.sat }}}, () => { this.validateDays() })
    }

    toggleSunday = () => {
        this.setState({ newCourse: { ...this.state.newCourse, days: { ...this.state.newCourse.days, sun: !this.state.newCourse.days.sun }}}, () => { this.validateDays() })
    }

    handleStartTimeChange = ({ target }) => {
        this.setState({ newCourse: { ...this.state.newCourse, startTime: target.value} })
    }

    handleEndTimeChange = ({ target }) => {
        this.setState({ newCourse: { ...this.state.newCourse, endTime: target.value} })
    }

    handlePlatformChange = ({ target }) => {
        this.setState({ newCourse: { ...this.state.newCourse, platform: target.value} }, () => {
            this.validateBuilding()
            this.validateRoom()
            this.validateStartTime()
            this.validateEndTime()
        })
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

    validateDepartment = () => {
        if (this.state.newCourse.department === "") {
            this.setState({departmentError: "Required"})
        } else if (this.state.newCourse.department.includes(" ")) {
            this.setState({departmentError: "No Spaces Allowed"})
        } else if (/\d/.test(this.state.newCourse.department)) {
            this.setState({departmentError: "No Numbers Allowed"})
        } else {
            this.setState({departmentError: ''})
        }
    }

    validateNumber = () => {
        if (this.state.newCourse.number === "") {
            this.setState({numberError: "Required"})
        } else if (this.state.newCourse.number.includes(" ")) {
            this.setState({numberError: "No Spaces Allowed"})
        } else if (!/^\d+$/.test(this.state.newCourse.number)) {
            this.setState({numberError: "Numbers Only"})
        } else {
            this.setState({numberError: ''})
        }
    }

    validateName = () => {
        if (this.state.newCourse.name === "") {
            this.setState({nameError: "Required"})
        } else {
            this.setState({nameError: ""})
        }
    }

    validateDescription = () => {
        if (this.state.newCourse.description === "") {
            this.setState({descriptionError: "Required"})
        } else {
            this.setState({descriptionError: ""})
        }
    }

    validateCredits = () => {
        if (this.state.newCourse.credits === "") {
            this.setState({creditsError: "Required"})
        } else if (!/^\d+$/.test(this.state.newCourse.credits)) {
            this.setState({creditsError: "Numbers Only"})
            return
        } else if (parseInt(this.state.newCourse.credits) < 0 ||
                parseInt(this.state.newCourse.credits) > 5) {
            this.setState({creditsError: "Between 0-5"})
        } else {
            this.setState({creditsError: ""})
        }
    }

    validateYear = () => {
        if (this.state.newCourse.year === "") {
            this.setState({yearError: "Required"})
        } else if (!/^\d+$/.test(this.state.newCourse.year)) {
            this.setState({yearError: "Numbers Only"})
            return
        } else if (parseInt(this.state.newCourse.year) < 2020) {
            this.setState({yearError: "Current or Future"})
        } else {
            this.setState({yearError: ""})
        }
    }

    validateDays = () => {
        if (this.state.newCourse.platform !== "online" &&
        this.state.newCourse.days.mon === false &&
        this.state.newCourse.days.tues === false &&
        this.state.newCourse.days.wed === false &&
        this.state.newCourse.days.thurs === false &&
        this.state.newCourse.days.fri === false &&
        this.state.newCourse.days.sat === false &&
        this.state.newCourse.days.sun === false
        ) {
            this.setState({daysError: "Select Day(s)"})
        } else {
            this.setState({daysError: ""})
        }
    }

    validateStartTime = () => {
        if (this.state.newCourse.startTime === "" && this.state.newCourse.platform !== "online") {
            this.setState({startTimeError: "Required"})
        } else {
            this.setState({startTimeError: ""})
        }
    }

    validateEndTime = () => {
        if (this.state.newCourse.endTime === "" && this.state.newCourse.platform !== "online") {
            this.setState({endTimeError: "Required"})
        } else {
            this.setState({endTimeError: ""})
        }
    }

    validateBuilding = () => {
        if (this.state.newCourse.building === "" && this.state.newCourse.platform !== "online") {
            this.setState({buildingError: "Required"})
        } else {
            this.setState({buildingError: ""})
        }
    }

    validateRoom = () => {
        if (this.state.newCourse.roomNumber === "" && this.state.newCourse.platform !== "online") {
            this.setState({roomError: "Required"})
        } else if (!/^\d+$/.test(this.state.newCourse.roomNumber) && this.state.newCourse.platform !== "online") {
            this.setState({roomError: "Numbers only"})
        } else {
            this.setState({roomError: ""})
        }
    }

    validateCapacity = () => {
        if (this.state.newCourse.capacity === "") {
            this.setState({capacityError: "Required"})
        } else if (!/^\d+$/.test(this.state.newCourse.capacity)) {
            this.setState({capacityError: "Numbers only"})
        }
    }

    checkErrors = () => {

        this.validateDepartment()
        this.validateNumber()
        this.validateName()
        this.validateDescription()
        this.validateCredits()
        this.validateYear()
        this.validateDays();
        this.validateStartTime()
        this.validateEndTime()
        this.validateBuilding()
        this.validateRoom()
        this.validateCapacity()

        // no errors
        if (this.state.departmentError === "" &&
        this.state.numberError === "" &&
        this.state.nameError === "" &&
        this.state.descriptionError === "" &&
        this.state.creditsError === "" &&
        this.state.yearError === "" &&
        this.state.daysError === "" &&
        this.state.startTimeError === "" &&
        this.state.endTimeError === "" &&
        this.state.buildingError === "" &&
        this.state.roomError === "" &&
        this.state.capacityError === "") {
            this.addInstructorCourse(this.state.newCourse);  
        }
              
    }

    // add course to list (instructor)
    addInstructorCourse(newCourse) {
        http.createNewCourse(JSON.stringify(newCourse))
        .then( async (response) => {
            const body = await response.json()
            if(response.status === 200 && body["message"] === "Successfully added New Course"){
                //this.props.closeModal(); //TODO get this modal to close when code get's here
                //TODO make api call to get courses to reflect new course, or add it to the state to re-render since we know it successfully was added to DB.
                this.handleDialogOpen();
            }
            else{
                console.log("server error adding course");
            }
        })
        .catch((e) => {
            console.warn("There was an error adding the course to the list: ", e);

            this.setState({
                error: "There was an error adding the course to the list."
            })
        })
    }

    handleDialogOpen = () => {
        this.setState({confirmDialogOpen: true})
    }

    handleDialogClose = () => {
        this.setState({confirmDialogOpen: false})
        this.props.closeModal();
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
                    className={classes.halfs}
                    required
                    id="department"
                    label="Department"
                    style={{ margin: 8 }}
                    helperText={this.state.departmentError === '' ? "CS, HIST, etc" : "CS, HIST, etc | " + this.state.departmentError}
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={this.handleDepartmentChange}
                    onBlur={this.validateDepartment}
                    error={this.state.departmentError === '' ? false : true}
                    />
                    <TextField
                    className={classes.halfs}
                    id="number"
                    label="Number"
                    style={{ margin: 8 }}
                    helperText={this.state.numberError === '' ? "1410, 2300, etc." : "1410, 2300, etc. | " + this.state.numberError}
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={this.handleNumberChange}
                    onBlur={this.validateNumber}
                    error={this.state.numberError === '' ? false : true}
                    />
                </div>
                <TextField
                id="name"
                label="Name"
                style={{ margin: 8 }}
                helperText={this.state.nameError === '' ? "Full Course Name" : "Full Course Name | " + this.state.nameError}
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={this.handleNameChange}
                onBlur={this.validateName}
                error={this.state.nameError === '' ? false : true}
                />
                <TextField
                id="description"
                label="Description"
                style={{ margin: 8 }}
                helperText={this.state.descriptionError === '' ? "Brief Course Description" : "Brief Course Description | " + this.state.descriptionError}
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={this.handleDescriptionChange}
                onBlur={this.validateDescription}
                error={this.state.descriptionError === '' ? false : true}
                />
                <div className={classes.horizontalFlex}>
                    <TextField
                    className={classes.eighths}
                    id="credits"
                    label="Credits"
                    helperText={this.state.creditsError === '' ? '' : this.state.creditsError}
                    style={{ margin: 8 }}
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={this.handleCreditsChange}
                    onBlur={this.validateCredits}
                    error={this.state.creditsError === '' ? false : true}
                    />
                    <TextField
                    className={classes.quarters}
                    id="semester"
                    label="Semester"
                    style={{ margin: 8 }}
                    select
                    defaultValue="fall"
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={this.handleSemesterChange}
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
                    helperText={this.state.yearError === "" ? '' : this.state.yearError}
                    style={{ margin: 8 }}
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={this.handleYearChange}
                    onBlur={this.validateYear}
                    error={this.state.yearError === "" ? false : true}
                    />
                    <TextField
                    className={classes.quarters}
                    id="block"
                    label="Block"
                    style={{ margin: 8 }}
                    select
                    defaultValue="full"
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
                {this.state.daysError === '' ? null : <Typography className={classes.daysError}>{this.state.daysError}</Typography> }
                <div className={classes.timesFlex}>
                    <TextField
                    id="startTime"
                    label="Start Time"
                    type="time"
                    className={classes.thirds}
                    helperText={this.state.startTimeError === '' ? '' : this.state.startTimeError}
                    style={{ margin: 8 }}
                    InputLabelProps={{
                    shrink: true,
                    }}
                    inputProps={{
                    step: 300, // 5 min
                    }}
                    onChange={this.handleStartTimeChange}
                    onBlur={this.validateStartTime}
                    error={this.state.startTimeError === '' ? false : true}
                    />
                    <TextField
                    id="endTime"
                    label="End Time"
                    type="time"
                    className={classes.thirds}
                    helperText={this.state.endTimeError === '' ? '' : this.state.endTimeError}
                    style={{ margin: 8 }}
                    InputLabelProps={{
                    shrink: true,
                    }}
                    inputProps={{
                    step: 300, // 5 min
                    }}
                    onChange={this.handleEndTimeChange}
                    onBlur={this.validateEndTime}
                    error={this.state.endTimeError === '' ? false : true}
                    />
                    <TextField
                    className={classes.thirds}
                    style={{ margin: 8 }}
                    id="platform"
                    label="Platform"
                    style={{ margin: 8 }}
                    select
                    defaultValue="inPerson"
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
                    helperText={this.state.buildingError === '' ? '' : this.state.buildingError}
                    style={{ margin: 8 }}
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={this.handleBuildingChange}
                    onBlur={this.validateBuilding}
                    error={this.state.buildingError === '' ? false : true}
                    />
                    <TextField
                    className={classes.quarters}
                    disabled={this.state.newCourse.platform === "online" ? true : false}
                    id="roomNumber"
                    label="Room #"
                    helperText={this.state.roomError === '' ? '' : this.state.roomError}
                    style={{ margin: 8 }}
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={this.handleRoomChange}
                    onBlur={this.validateRoom}
                    error={this.state.roomError === '' ? false : true}
                    />
                    <TextField
                    className={classes.quarters}
                    id="capacity"
                    label="Capacity"
                    helperText={this.state.capacityError === '' ? '' : this.state.capacityError}
                    style={{ margin: 8 }}
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={this.handleCapacityChange}
                    onBlur={this.validateCapacity}
                    error={this.state.capacityError === '' ? false : true}
                    />
                </div>

                <Dialog
                    open={this.state.confirmDialogOpen}
                    onClose={this.handleDialogClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Success"}</DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Course Successfully Added
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={this.handleDialogClose} color="primary" autoFocus>
                        Nice!
                    </Button>
                    </DialogActions>
                </Dialog>

                <List>
                    <ListItem className={classes.buttons}>
                        <Button className={classes.modalButton} onClick={this.props.closeModal}>Cancel</Button>
                        <Button className={classes.modalButton} onClick={this.checkErrors}>Add Course</Button>
                    </ListItem>
                </List>
            </div>
            
        );
    }
}

export default withStyles(styles)(AddCourse);
