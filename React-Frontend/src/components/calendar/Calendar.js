import React, { Component } from 'react';
import { Container, Paper, Table, TableContainer, TableHead, TableBody,
     TableRow, TableCell, TablePagination, Toolbar, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from 'moment';

const localizer = momentLocalizer(moment);

const styles = withStyles => ({
    calendar: {
        
    }
  });

class LMSCalendar extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            events: [
                {
                    start: moment().toDate(),
                    end: moment()
                        .add(1, "days")
                        .toDate(),
                    title: "Some event title"
                }
            ]
        };
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
                    />
            </Container>
        )
    }
}

export default withStyles(styles)(LMSCalendar)