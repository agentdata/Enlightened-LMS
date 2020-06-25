import React from 'react';
import { Container, Card, CardContent, CardActions, 
        Typography, Button, Avatar, List, ListItem, 
        Divider, TextField, TextareaAutosize } from '@material-ui/core';
import FileUploader from './sitewide/FileUploader';
import { withStyles } from '@material-ui/core/styles'
import {BrowserRouter as Router, Link} from "react-router-dom";

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
    birthDate: {
        justifyContent: "center"
    },
    right: {
        maxWidth: "400px",
        display: "flex",
        justifyContent: "space-around"
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
            editing: false,
            updatedUserDetails: {
                bio: props.bio,
                phone: props.phone,
                address1: props.address1,
                link1: props.link1,
                link2: props.link2,
                link3: props.link3
            }
        };
    }

    handleBioChange = ({ target }) => {
        this.setState({ updatedUserDetails: { ...this.state.updatedUserDetails, bio: target.value} })
    }

    handlePhoneChange = ({ target }) => {
        this.setState({ updatedUserDetails: { ...this.state.updatedUserDetails, phone: target.value } })
    }

    handleAddressChange = ({ target }) => {
        this.setState({ updatedUserDetails: { ...this.state.updatedUserDetails, address: target.value } })
    }

    handleLink1Change = ({ target }) => {
        this.setState({ updatedUserDetails: { ...this.state.updatedUserDetails, link1: target.value } })
    }

    handleLink2Change = ({ target }) => {
        this.setState({ updatedUserDetails: { ...this.state.updatedUserDetails, link2: target.value } })
    }

    handleLink3Change = ({ target }) => {
        this.setState({ updatedUserDetails: { ...this.state.updatedUserDetails, link3: target.value } })
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
        const {email, eNumber, firstName, lastName, phone, birthDate, state, city, zip, address1, bio, avatar, link1, link2, link3} = {...this.props.details};
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
                                <FileUploader name="avatar" 
                                    uploadTypes=".png, .jpeg, .jpg" 
                                    validFileTypes={["image/apng", "image/bmp", "image/gif", "image/jpeg", "image/pjpeg", "image/png"]} 
                                    updateFileCallback={this.props.updateFileCallback}/>
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
                                <ListItem className={classes.birthDate}>
                                    <Typography className={classes.detailTitle} variant="body1" >
                                        Birthday:
                                    </Typography>
                                    <Typography>
                                        {birthDate}
                                    </Typography>
                                </ListItem>
                                <ListItem className={classes.birthDate}>
                                    <Typography className={classes.detailTitle} variant="body1">
                                        E#: 
                                    </Typography>
                                    <Typography>
                                        {eNumber}
                                    </Typography>
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <Link to="account">
                                        <Button className={classes.editButton}>
                                            Account Details
                                        </Button>
                                    </Link>
                                </ListItem>
                            </List>
                        </div>
                        <div className={classes.right}>
                            {!this.state.editing ? 
                            <List>
                                <Button className={classes.editButton} onClick={this.editButtonPressed}>Edit</Button>
                                <ListItem className={classes.bioTitle}>
                                    <Typography className={classes.detailTitle} variant="body1" >
                                        Bio:
                                    </Typography>
                                    
                                    <Typography variant="body1">
                                        {bio}
                                    </Typography>
                                </ListItem>
                                <ListItem className={classes.listItem}>
                                    <Typography className={classes.detailTitle} variant="body1" >
                                        Phone:
                                    </Typography>
                                    <Typography variant="body1">
                                        {phone}
                                    </Typography>
                                </ListItem>
                                <ListItem className={classes.listItem}>
                                    <Typography className={classes.detailTitle} variant="body1" >
                                        Address:
                                    </Typography>
                                    <Typography variant="body1">
                                        {address1} {city} , {state} {zip}
                                    </Typography>
                                </ListItem>
                                <ListItem className={classes.listItem}>
                                    <Typography className={classes.detailTitle} variant="body1" >
                                        Facebook:
                                    </Typography>
                                    <Typography variant="body1">
                                        <a href={link1}>My facebook profile</a>
                                    </Typography>
                                </ListItem>
                                <ListItem className={classes.listItem}>
                                    <Typography className={classes.detailTitle} variant="body1" >
                                        LinkedIN:
                                    </Typography>
                                    <Typography variant="body1">
                                        <a href={link2}>My LinkedIN profile</a>
                                    </Typography>
                                </ListItem>
                                <ListItem className={classes.listItem}>
                                    <Typography className={classes.detailTitle} variant="body1" >
                                        Github:
                                    </Typography>
                                    <Typography variant="body1">
                                        <a href={link3}>My GitHub profile</a>
                                    </Typography>
                                </ListItem>
                            </List> : 
                            <List>
                                <Button className={classes.editButton} onClick={this.editButtonPressed}>Cancel</Button>
                                <ListItem className={classes.bioTitle}>
                                    <Typography className={classes.detailTitle} variant="body1" >
                                        Bio:
                                    </Typography>
                                    <TextareaAutosize onChange={this.handleBioChange}>
                                        {bio}
                                    </TextareaAutosize>
                                </ListItem>
                                <ListItem className={classes.listItem}>
                                    <Typography className={classes.detailTitle} variant="body1" >
                                        Phone:
                                    </Typography>
                                    <TextField className={classes.textInput} inputProps={phone} defaultValue={phone} 
                                    onChange={this.handlePhoneChange} />
                                </ListItem>
                                <ListItem className={classes.listItem}>
                                    <Typography className={classes.detailTitle} variant="body1" >
                                        Address:
                                    </Typography>
                                    <TextField className={classes.textInput} 
                                    defaultValue={address1 + " " + city + ", " + state + " " + zip} 
                                    onChange={this.handleAddressChange} />
                                </ListItem>
                                <ListItem className={classes.listItem}>
                                    <Typography className={classes.detailTitle} variant="body1" >
                                        Facebook:
                                    </Typography>
                                    <TextField className={classes.textInput} defaultValue={link1} 
                                    onChange={this.handleLink1Change} />
                                </ListItem>
                                <ListItem className={classes.listItem}>
                                    <Typography className={classes.detailTitle} variant="body1" >
                                        LinkedIN:
                                    </Typography>
                                    <TextField className={classes.textInput} defaultValue={link2} 
                                    onChange={this.handleLink2Change} />
                                </ListItem>
                                <ListItem className={classes.listItem}>
                                    <Typography className={classes.detailTitle} variant="body1" >
                                        Github:
                                    </Typography>
                                    <TextField className={classes.textInput} defaultValue={link3} 
                                    onChange={this.handleLink3Change} />
                                </ListItem>
                            </List>
                            }
                        </div>
                    </CardContent>
                    <CardActions>
                        <Button size="medium" className={classes.editButton}>Logout</Button>
                        {this.state.editing && <Button size="medium" className={classes.editButton}
                            onClick={() => this.props.updateCallback(this.state.updatedUserDetails)}>Save changes</Button>}
                    </CardActions>
                </Card>
            </Container>
        );
    }
}  

export default withStyles(styles)(UserDetails)