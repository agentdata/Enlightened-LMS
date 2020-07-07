import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles"
import { Typography, Button, List, ListItem, 
        TextField, MenuItem } from '@material-ui/core';
import http from '../../api/http';

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
    submissionButton: {
        borderRadius: "3px",
        border: "1px solid rgba(0, 0, 0, 0.54)",
        minWidth: "50px",
        marginRight: "10px",
    },
    submissionSelected: {
        borderRadius: "3px",
        border: "1px solid rgba(0, 0, 0, 0.54)",
        backgroundColor: "#80e2a7",
        minWidth: "50px",
        '&:hover': {
            backgroundColor: "#57ad79"
        },
        marginRight: "10px"
    },
    daysFlex: {
        marginLeft: "5px",
        display: "flex",
        flexDirection: "row",
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

class AddAssignment extends Component {

    constructor(props) {
        super(props)

        this.state = {
            newAssignment:
                {
                    name: '', // assignment name/title
                    description: '', // long description
                    submissionType: '', // textbox/file upload
                    dueDate: '', // date/time
                    pointsPossible: '' // total points possible
                },
            nameError: '',
            descriptionError: '',
            submissionTypeError: '',
            dueDateError: '',
            pointsPossibleError: ''
        };
    }
    

    getLoggedIn = async () => {
        // check if user logged in, set state accordingly
    }

    componentDidMount() {
        this.getLoggedIn();
    }

    handleNameChange = ({ target }) => {
        this.setState({ newAssignment: { ...this.state.newAssignment, name: target.value} })
    }

    handleDescriptionChange = ({ target }) => {
        this.setState({ newAssignment: { ...this.state.newAssignment, description: target.value} })
    }

    handleSubmissionTypeText = () => {
        this.setState({ newAssignment: { ...this.state.newAssignment, submissionType: "TEXTBOX"} })
    }

    handleSubmissionTypeUpload = () => {
        this.setState({ newAssignment: { ...this.state.newAssignment, submissionType: "FILEUPLOAD"} })
    }

    handleDueDateChange = ({ target }) => {
        this.setState({ newAssignment: { ...this.state.newAssignment, dueDate: target.value} })
    }

    handlePointsPossibleChange = ({ target }) => {
        this.setState({ newAssignment: { ...this.state.newAssignment, pointsPossible: target.value} })
    }

    validateName = () => {
        if (this.state.newAssignment.name === "") {
            this.setState({nameError: "Required"})
        } else {
            this.setState({nameError: ""})
        }
    }

    validateDescription = () => {
        if (this.state.newAssignment.description === "") {
            this.setState({descriptionError: "Required"})
        } else {
            this.setState({descriptionError: ""})
        }
    }

    validateSubmissionType = () => {
        if (this.state.newAssignment.submissionType === "") {
            this.setState({submissionTypeError: "Required"})
        } else if (!/^\d+$/.test(this.state.newAssignment.credits)) {
            this.setState({creditsError: "Numbers Only"})
            return
        } else if (parseInt(this.state.newAssignment.credits) < 0 ||
                parseInt(this.state.newAssignment.credits) > 5) {
            this.setState({creditsError: "Between 0-5"})
        } else {
            this.setState({creditsError: ""})
        }
    }

    validateDueDate = () => {
        if (this.state.newAssignment.dueDate === "") {
            this.setState({dueDateError: "Required"})
        //} else if (parseInt(this.state.newAssignment.year) < 2020) {
          //  this.setState({yearError: "Current or Future"})
        } else {
            this.setState({dueDateError: ""})
        }
    }

    validatePointsPossible = () => {
        if (this.state.newAssignment.pointsPossible === "") {
            this.setState({pointsPossibleError: "Required"})
        } else if (!/^\d+$/.test(this.state.newAssignment.pointsPossible)) {
            this.setState({pointsPossibleError: "Numbers Only"})
            return
        } else {
            this.setState({pointsPossibleError: ""})
        }
    }

    checkErrors = () => {

        this.validateName()
        this.validateDescription()
        this.validateSubmissionType()
        this.validateDueDate()
        this.validatePointsPossible()

        // no errors
        if (this.state.nameError === "" &&
        this.state.descriptionError === "" &&
        this.state.submissionTypeError === "" &&
        this.state.dueDateError === "" &&
        this.state.pointsPossibleError === "") {
            this.addNewAssignment(this.state.newAssignment);    
        }   
    }

    // add course to list (instructor)
    addNewAssignment(newAssignment) {
        const assignmentBody =
        {
            "title": newAssignment.name,
            "description": newAssignment.description,
            "submissionType": newAssignment.submissionType,
            "dueDate": newAssignment.dueDate,
            "maxPoints": newAssignment.pointsPossible,
            "courseId": "5efab3f635f9126181edb9ee"  //hardcoding course in until we pass the courseId to this component
        }

        http.createNewAssignment(JSON.stringify(assignmentBody))
        .then( async (response) => {
            const body = await response.json()
            if(response.status == 200 && body["message"] === "Successfully added new assignment"){
                this.props.closeModal();
                //TODO make api call to get courses to reflect new course, or add it to the state to re-render since we know it successfully was added to DB.

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

    render() {
        const { classes } = this.props

        return (
            <div className={classes.verticalFlex}>
                <div className={classes.title}>
                    <Typography variant="h5">Add New Assignment</Typography>
                </div>
                <TextField
                id="name"
                label="Assignment Name"
                style={{ margin: 8 }}
                helperText={this.state.nameError === '' ? "" : this.state.nameError}
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
                label="Assignment Description"
                multiline
                style={{ margin: 8 }}
                helperText={this.state.descriptionError === '' ? "" : this.state.descriptionError}
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={this.handleDescriptionChange}
                onBlur={this.validateDescription}
                error={this.state.descriptionError === '' ? false : true}
                />
                <Typography variant="body1" className={classes.dayTitle}>Submission Type</Typography>
                <div className={classes.daysFlex}>
                    <Button onClick={this.handleSubmissionTypeText}
                    value="Text Submission"
                    className={this.state.newAssignment.submissionType === 'TEXTBOX' ? classes.submissionSelected : classes.submissionButton}>
                        Text Submission
                    </Button>
                    <Button onClick={this.handleSubmissionTypeUpload}
                    className={this.state.newAssignment.submissionType === 'FILEUPLOAD' ? classes.submissionSelected : classes.submissionButton}>
                        File Upload
                    </Button>
                </div>
                {this.state.submissionTypeError === '' ? null : <Typography className={classes.submissionTypeError}>{this.state.submissionTypeError}</Typography> }
                <TextField
                id="dueDate"
                label="Due Date"
                type="datetime-local"
                helperText={this.state.dueDateError === '' ? '' : this.state.dueDateError}
                style={{ margin: 8 }}
                InputLabelProps={{
                shrink: true,
                }}
                inputProps={{
                step: 300, // 5 min
                }}
                onChange={this.handleDueDateChange}
                onBlur={this.validateDueDate}
                error={this.state.dueDateError === '' ? false : true}
                />
                <TextField
                id="pointsPossible"
                label="Points Possible"
                style={{ margin: 8 }}
                helperText={this.state.pointsPossibleError === '' ? "" : this.state.pointsPossibleError}
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={this.handlePointsPossibleChange}
                onBlur={this.validatePointsPossible}
                error={this.state.pointsPossibleError === '' ? false : true}
                />

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

export default withStyles(styles)(AddAssignment);
