import React, { Component } from 'react';
import { Container, Paper, Table, TableContainer, TableHead, TableBody,
     TableRow, TableCell, TablePagination, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

function createData( Sun, Mon, Tue, Wed, Thu, Fri, Sat) {
    return { Sun, Mon, Tue, Wed, Thu, Fri, Sat };
  }
  
const rows = [
    createData('cell', 'cell', 'cell', 'cell', 'cell', 'cell', 'cell'),
    createData('cell', 'cell', 'cell', 'cell', 'cell', 'cell', 'cell'),
    createData('cell', 'cell', 'cell', 'cell', 'cell', 'cell', 'cell'),
    createData('cell', 'cell', 'cell', 'cell', 'cell', 'cell', 'cell'),
    createData('cell', 'cell', 'cell', 'cell', 'cell', 'cell', 'cell'),
    createData('cell', 'cell', 'cell', 'cell', 'cell', 'cell', 'cell'),
    createData('cell', 'cell', 'cell', 'cell', 'cell', 'cell', 'cell'),
    createData('cell', 'cell', 'cell', 'cell', 'cell', 'cell', 'cell'),
    createData('cell', 'cell', 'cell', 'cell', 'cell', 'cell', 'cell'),
    createData('cell', 'cell', 'cell', 'cell', 'cell', 'cell', 'cell'),
    createData('cell', 'cell', 'cell', 'cell', 'cell', 'cell', 'cell'),
    createData('cell', 'cell', 'cell', 'cell', 'cell', 'cell', 'cell'),
    createData('cell', 'cell', 'cell', 'cell', 'cell', 'cell', 'cell'),
];
  
const headCells = [
    { id: 'Sun', label: 'Sun' },
    { id: 'Mon', label: 'Mon' },
    { id: 'Tue', label: 'Tue' },
    { id: 'Wed', label: 'Wed' },
    { id: 'Thu', label: 'Thu' },
    { id: 'Fri', label: 'Fri' },
    { id: 'Sat', label: 'Sat' }
];

function EnhancedTableHead(props) {
    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align="center"
            >
              {headCell.label}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
}

const useStyles = makeStyles((theme) => ({
  }));


export default function Calendar() {

    const months = {
        0: 'currentMonth (July)',
        1: 'nextMonth (August)',
        2: 'theNextMonth...',
        3: '',
    }

    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [month, setMonth] = React.useState(7);
    
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 5));
        setPage(0);
    };
    
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    
    return (
        <Container>
            <Paper className={classes.paper}>
                <Toolbar>
                    <Typography className={classes.title} variant="h6" id="calendarTitle" component="div">
                        MonthName
                    </Typography>
                    <TablePagination
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </Toolbar>
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="calendar"
                        aria-label="calendar"
                    >
                        <EnhancedTableHead
                            classes={classes}
                            rowCount={rows.length}
                        />
                            <TableBody>
                                {rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    return (
                                        <TableRow
                                        tabIndex={-1}
                                        key={index}
                                        >
                                            <TableCell align="center" style={{ borderRight: '1px solid #ccc' }}>{row.Sun}</TableCell>
                                            <TableCell align="center" style={{ borderRight: '1px solid #ccc' }}>{row.Mon}</TableCell>
                                            <TableCell align="center" style={{ borderRight: '1px solid #ccc' }}>{row.Tue}</TableCell>
                                            <TableCell align="center" style={{ borderRight: '1px solid #ccc' }}>{row.Wed}</TableCell>
                                            <TableCell align="center" style={{ borderRight: '1px solid #ccc' }}>{row.Thu}</TableCell>
                                            <TableCell align="center" style={{ borderRight: '1px solid #ccc' }}>{row.Fri}</TableCell>
                                            <TableCell align="center">{row.Sat}</TableCell>
                                        </TableRow>
                                    );
                                })}
                                {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                                )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Container>
    )
}