import React from 'react';
import { Container, Card, CardContent, CardActions, 
        Typography, Button, Avatar, List, ListItem, 
        Divider, TextField, TextareaAutosize } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import SelectInput from '@material-ui/core/Select/SelectInput';
import FileUploader from './sitewide/FileUploader';
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
    profilePic: {
        minWidth: "270px",
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
        border: "1px solid black",
        margin: "auto"
    },
    left: {
        maxWidth: "300px"
    },
    name: {
        textAlign: "center"
    },
    email: {
        justifyContent: "center"
    },
    right: {
        maxWidth: "400px"
    },
    cardContent: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around"
    },
    detailTitle: {
        marginRight: "10px",
        fontWeight: "bold",
    },
    bioTitle: {
        marginRight: "10px",
        alignItems: "start"
    },
    textInput: {
        width: "300px"
    },
    listItem: {
        display: "block"
    }
})

class UserDetails extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            changesMade: false,
            userUIDetails: this.props.details,
            editing: false
        };
    }

    componentDidUpdate() {

    }

    editButtonPressed = () => {
        this.setState({
            editing: !this.state.editing
        }, () => {
            this.toggleEditView();
        })
    }


    toggleEditView() {
        console.log(this.state.editing)
    }

    render() {
        const { classes } = this.props
        const {email, firstName, lastName, phone, birthDate, state, city, zip, address1, bio, avatar, link1, link2, link3} = {...this.props.details};
        // const email = 'testemail@gmail.com'
        // const firstName = 'Justin'
        // const lastName = 'Edwards'
        // const phone = '208-403-8421'
        // const birthDate = "February 9, 1999"
        // const state = "UT"
        // const city = "Ogden"
        // const zip = "84403"
        // const address1 = "4239 Monroe Blvd"
        // const bio = "this is my bio. it has a lot of neat information about me which is pretty neat huh. lol. whattup dude"
        return (
            <Container >
                <Card className={classes.main} style={{padding: 10}}>
                    <CardContent className={classes.cardContent}>
                        <div className={classes.left}>
                            <Card className={classes.profilePic}>
                                <Avatar alt={firstName + '\'s avatar'} src={avatar} style={{ width: '80px', height: '80px', margin: '0 auto'}}/>
                                <FileUploader uploadType="new avatar" updateFileCallback={this.props.updateFileCallback}/>
                            </Card>
                            <List>
                                <ListItem>
                                    <Typography variant="h3" className={classes.name}>
                                        {firstName} {lastName}
                                    </Typography>
                                </ListItem>
                                <ListItem className={classes.email}>
                                    <Typography variant="h6">
                                        {email}
                                    </Typography>
                                </ListItem>
                                <Divider variant="li"></Divider>
                            </List>
                        </div>
                        <div className={classes.right}>
                            {!this.state.editing ? 
                            <List>
                                <Button className={classes.editButton} onClick={this.editButtonPressed}>Edit</Button>
                                <ListItem className={classes.bioTitle}>
                                    <Typography className={classes.detailTitle} component="p" variant="p" >
                                        Bio:
                                    </Typography>
                                    
                                    <Typography component="p" variant="p">
                                        {bio}
                                    </Typography>
                                </ListItem>
                                <ListItem className={classes.listItem}>
                                    <Typography className={classes.detailTitle} component="p" variant="p" >
                                        Phone:
                                    </Typography>
                                    <Typography component="p" variant="p">
                                        {phone}
                                    </Typography>
                                </ListItem>
                                <ListItem className={classes.listItem}>
                                    <Typography className={classes.detailTitle} component="p" variant="p" >
                                        Birthday:
                                    </Typography>
                                    <Typography component="p" variant="p">
                                        //{birthDate}
                                    </Typography>
                                </ListItem>
                                <ListItem className={classes.listItem}>
                                    <Typography className={classes.detailTitle} component="p" variant="p" >
                                        Address:
                                    </Typography>
                                    <Typography component="p" variant="p">
                                        {address1} {city} , {state} {zip}
                                    </Typography>
                                </ListItem>
                                <ListItem className={classes.listItem}>
                                    <Typography className={classes.detailTitle} component="p" variant="p" >
                                        Facebook:
                                    </Typography>
                                    <Typography component="p" variant="p">
                                        <a href={link1}>My facebook profile</a>
                                    </Typography>
                                </ListItem>
                                <ListItem className={classes.listItem}>
                                    <Typography className={classes.detailTitle} component="p" variant="p" >
                                        LinkedIN:
                                    </Typography>
                                    <Typography component="p" variant="p">
                                        <a href={link2}>My LinkedIN profile</a>
                                    </Typography>
                                </ListItem>
                                <ListItem className={classes.listItem}>
                                    <Typography className={classes.detailTitle} component="p" variant="p" >
                                        Github:
                                    </Typography>
                                    <Typography component="p" variant="p">
                                        <a href={link3}>My GitHub profile</a>
                                    </Typography>
                                </ListItem>
                            </List> : 
                            <List>
                                <Button className={classes.editButton} onClick={this.editButtonPressed}>Cancel</Button>
                                <ListItem className={classes.bioTitle}>
                                    <Typography className={classes.detailTitle} component="p" variant="p" >
                                        Bio:
                                    </Typography>
                                    <TextareaAutosize>
                                        {bio}
                                    </TextareaAutosize>
                                </ListItem>
                                <ListItem className={classes.listItem}>
                                    <Typography className={classes.detailTitle} component="p" variant="p" >
                                        Phone:
                                    </Typography>
                                    <TextField className={classes.textInput} inputProps={phone} defaultValue={phone} />
                                </ListItem>
                                <ListItem className={classes.listItem}>
                                    <Typography className={classes.detailTitle} component="p" variant="p" >
                                        Birthday:
                                    </Typography>
                                    <TextField className={classes.textInput} defaultValue={birthDate} />
                                </ListItem>
                                <ListItem className={classes.listItem}>
                                    <Typography className={classes.detailTitle} component="p" variant="p" >
                                        Address:
                                    </Typography>
                                    <TextField className={classes.textInput} defaultValue={address1 + " " + city + ", " + state + " " + zip} />
                                </ListItem>
                                <ListItem className={classes.listItem}>
                                    <Typography className={classes.detailTitle} component="p" variant="p" >
                                        Facebook:
                                    </Typography>
                                    <TextField className={classes.textInput} defaultValue={link1} />
                                </ListItem>
                                <ListItem className={classes.listItem}>
                                    <Typography className={classes.detailTitle} component="p" variant="p" >
                                        LinkedIN:
                                    </Typography>
                                    <TextField className={classes.textInput} defaultValue={link2} />
                                </ListItem>
                                <ListItem className={classes.listItem}>
                                    <Typography className={classes.detailTitle} component="p" variant="p" >
                                        Github:
                                    </Typography>
                                    <TextField className={classes.textInput} defaultValue={link3} />
                                </ListItem>
                            </List>
                            }
                        </div>
                    </CardContent>
                    <CardActions>
                        <Button size="medium" className={classes.editButton}>Logout</Button>
                        {this.state.editing && <Button size="medium" className={classes.editButton}
                            onClick={() => this.props.updateCallback(this.state.userUIDetails)}>Save changes</Button>}
                    </CardActions>
                </Card>
            </Container>
        );
    }
}  

export default withStyles(styles)(UserDetails)