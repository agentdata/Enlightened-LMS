import React, { Component } from 'react';
import { Container, Modal } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import CourseAssignment from '../course/CourseAssignment';
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from 'moment';

const localizer = momentLocalizer(moment);

const styles = withStyles => ({
    calendar: {
        
    },
    modal: {
        
    }
  });

class LMSCalendar extends React.Component {

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
                }
            ]
        };
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