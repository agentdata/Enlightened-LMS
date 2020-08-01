import React, { Component } from 'react';
import { Container, Modal } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import CourseAssignment from '../course/CourseAssignment';
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from 'moment';
import http from '../../api/http';

const localizer = momentLocalizer(moment);

const styles = withStyles => ({
    calendar: {


    },
    modal: {
        
    }
  });

class LMSCalendar extends React.Component {

    getAllAssignments()
    {
        http.getAllAssignments()
            .then(async (response) => {
                const body = await response.json();
                if (response.status === 200 && body["message"] === "success") {
                    for (let a of body["assignments"]) {
                        console.log(a)
                        this.setState({
                            events: [...this.state.events,
                                {
                                    start: a.dueDate,
                                    end: a.dueDate,
                                    title: a.title,
                                    courseId: a.courseId,
                                    assignmentId: a.assignmentId
                                }]
                        })
                    }
                }
            })
            .catch((e) => {
                console.warn("There was an error getting all assignments: ", e);
            })
    }

    constructor(props) {
        super(props)

        this.state = {
            selectedAssignment: null,
            events: [
                {
                    start: moment().toDate(),
                    end: moment()
                        .toDate(),
                    title: "Some event title",
                    courseId: 'Course',
                    assignmentId: 'Assignment'
                }
            ]
        };

        this.getAllAssignments()
    }

    loadEvents() {
        // API call goes here -- need to load in the due assignment

        // Inside if (response.status === 200) block:
        
        // this.setState({
        //     events: [...events, dueAssignment]
        // })
    }

    componentDidMount() {
        this.loadEvents();
    }

    componentDidUpdate() {
        
    }

    handleAssignmentClose = () => {
    }

    setAssignmentClicked() {
    }

    handleSelectEvent = () => {
        console.log("stuff")
        this.setState({
            selectedAssignment: {
                title: "Assignment",
                description: "Desc"
            }
        })
    }

    render() {
        const { classes } = this.props;

        return (
            <Container>
                <Calendar
                    localizer={localizer}
                    defaultDate={new Date()}
                    defaultView="month"
                    events={this.state.events}
                    style={{ height: "90vh" }}
                    onSelectEvent={this.handleSelectEvent}
                    />
                    {/* {this.selectedAssignment && (
                        <Modal
                        className={classes.modal}
                        disableBackdropClick
                        open={assignmentModalOpen}
                        onClose={handleAssignmentClose}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        >
                            <div className={classes.paper}>
                                <CourseAssignment closeModal = {this.handleAssignmentClose()} assignmentClicked = {this.selectedAssignment}/>
                            </div>
                        </Modal>
                    )} */}
            </Container>
        )
    }
}

export default withStyles(styles)(LMSCalendar)