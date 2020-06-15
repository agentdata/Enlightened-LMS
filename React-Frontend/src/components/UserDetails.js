import React from 'react';
import { Container, Card, CardContent, CardActions, 
        Typography, Button, Avatar, List, ListItem, Divider } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import SelectInput from '@material-ui/core/Select/SelectInput';
import FileUploader from './sitewide/FileUploader';
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
    main: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    listItem: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center"
    },
    mainDetails: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap"
    },
    profilePic: {
        minWidth: "100px",
    },
    detailList: {
        textAlign: "center"
    },
    editButton: {
        backgroundColor: "#efefef",
        marginTop: "10px",
        padding: "5px",
        paddingRight: "20px",
        paddingLeft: "20px",
        borderRadius: "10%",
        border: "1px solid black"
    }
})

class UserDetails extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            changesMade: false,
            userUIDetails: this.props.details
        };
    }

    componentDidUpdate() {

    }

    render() {
        const { classes } = this.props
        const {/*email, firstName, lastName, phone, birthDate, state, city, zip, address1, */ bio, avatar, link1, link2, link3} = {...this.props.details};
        const email = 'testemail@gmail.com'
        const firstName = 'Justin'
        const lastName = 'Edwards'
        const phone = '208-403-8421'
        const birthDate = "February 9, 1999"
        const state = "UT"
        const city = "Ogden"
        const zip = "84403"
        const address1 = "4239 Monroe Blvd"
        return (
            <Container >
                <Card className={classes.main} style={{padding: 10}}>
                    <CardContent>
                        <div className="profilePic">
                            <Card>
                                <Avatar alt={firstName + '\'s avatar'} src={avatar} style={{ width: '80px', height: '80px', margin: '0 auto'}}/>
                                <FileUploader uploadType="new avatar"/>
                            </Card>
                        </div>
                        <List className={classes.detailList}>
                            <ListItem className={classes.listItem}>
                                <Typography variant="h3">
                                    {firstName} {lastName}
                                </Typography>
                            </ListItem>
                            <ListItem className={classes.listItem}>
                                <Typography variant="h6">
                                    {email}
                                </Typography>
                            </ListItem>
                            <Divider variant="li"></Divider>
                            <Button className={classes.editButton}>Edit</Button>
                            <ListItem className={classes.listItem}>
                                <Typography component="p" variant="p" >
                                    Bio:
                                </Typography>
                                <Typography component="p" variant="p">
                                    {bio}
                                </Typography>
                            </ListItem>
                            <ListItem className={classes.listItem}>
                                <Typography component="p" variant="p" >
                                    Phone:
                                </Typography>
                                <Typography component="p" variant="p">
                                    {phone}
                                </Typography>
                            </ListItem>
                            <ListItem className={classes.listItem}>
                                <Typography component="p" variant="p" >
                                    Birthday:
                                </Typography>
                                <Typography component="p" variant="p">
                                    //{birthDate}
                                </Typography>
                            </ListItem>
                            <ListItem className={classes.listItem}>
                                <Typography component="p" variant="p" >
                                    Address:
                                </Typography>
                                <Typography component="p" variant="p">
                                    {address1} {city} , {state} {zip}
                                </Typography>
                            </ListItem>
                            <ListItem className={classes.listItem}>
                                <Typography component="p" variant="p" >
                                    Facebook:
                                </Typography>
                                <Typography component="p" variant="p">
                                    <a href={link1}>My facebook profile</a>
                                </Typography>
                            </ListItem>
                        <Typography component="p" variant="p" >
                            LinkedIN:
                        </Typography>
                        <Typography component="p" variant="p">
                            <a href={link2}>My LinkedIN profile</a>
                        </Typography>
                        <Typography component="p" variant="p" >
                            Facebook:
                        </Typography>
                        <Typography component="p" variant="p">
                            <a href={link3}>My GitHub profile</a>
                        </Typography>
                        </List>
                    </CardContent>
                    <CardActions>
                        {this.state.changesMade && <Button size="medium" 
                            onClick={() => this.props.updateCallback(this.state.userUIDetails)}>Save changes</Button>}
                        <Button size="medium">Logout</Button>
                    </CardActions>
                </Card>
            </Container>
        );
    }
}  

export default withStyles(styles)(UserDetails)