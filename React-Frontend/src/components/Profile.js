import React from 'react';
import { withStyles } from '@material-ui/core/styles'
import UserDetails from './UserDetails'

        // UserDetails Component - renders/displays user info

const styles = theme => ({
    main: {
        width: "100%"
    }
})

// Profile Component - Container for UserDetails
class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null
        };
    }

    // initializeAvatarChange -- called by UserDetails->FileUploader child component
    initializeAvatarChange = (avatar) => {
        this.setUserAvatar(avatar);
    }

    // update user avatar (independent of rest of user profile)
    setUserAvatar(newAvatar) {
        let reader = new FileReader();
        reader.readAsDataURL(newAvatar);
        reader.onloadend = () => {
            
            const headers = new Headers();
            headers.append('Authorization', 'Bearer ' + sessionStorage.getItem("token"));
            headers.append('Content-Type', 'application/json');

            const init = {
                method: 'PUT',
                headers,
                body: JSON.stringify({"avatar": reader.result} )
            };

        fetch('https://cooliocoders.ddns.net/api/user/profile/avatar', init)
            .then(async (response) => {
                const text = await response.json();
                if(response.status === 200){
                    this.setState((prevState) => ({
                        userDetails: {
                            ...prevState.userDetails,
                            avatar: reader.result
                        }
                    }))
                }
                }).catch((e) => {
                console.warn('There was an error saving user avatar: ', e)

                this.setState({
                    error: 'There was an error saving user avatar.'
                })
            });
        };
    }

    // initializeUserChanges -- called by UserDetails child component
    initializeUserChanges = (updatedFields) => {
        this.updateUserDetails(updatedFields)
    }

    // implement post api call to update user profile - child component uses callback
    updateUserDetails(updatedFields) {
        //Validate URL and email fields
        let valid = true;
        let email = updatedFields.email;
        let link1 = updatedFields.link1;
        let link2 = updatedFields.link2;
        let link3 = updatedFields.link3;

        if(!isEmail(email)){valid = false;}
        else if(!isUrl(link1)){valid = false;}
        else if(!isUrl(link2)){valid = false;}
        else if(!isUrl(link3)){valid = false;}

        function isEmail(email)
        {
            let regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;    //email regex
            if (regex.test(email))
                return true;
            return false;
        }
        function isUrl(url) {
            if(url === null || url === "")
                return true;
            try{new URL(url);}
            catch (_){return false;}
            return true;
        }

        if(true)   //This only runs if the email and urls are valid
        {
            var statusCode;
            const headers = new Headers();
            headers.append('Authorization', 'Bearer '+sessionStorage.getItem("token"));
            headers.append('Content-Type', 'application/json');
            const init = {
                method: 'PUT',
                headers,
                body: JSON.stringify(updatedFields)
            };

            fetch('https://cooliocoders.ddns.net/api/user/profile', init)
                .then(async response => {
                    const text = await response.json();
                    if(response.status === 200){
                        
                        // set the state to reflect changes based on updatedFields, leave bavatar and enumber the same
                        this.setState({userDetails:
                            {
                                email: this.state.userDetails.email,
                                firstName: this.state.userDetails.firstName,
                                lastName: this.state.userDetails.lastName,
                                phone: (updatedFields["phone"]!==null) ? text["phone"]: "",
                                birthDate: (updatedFields["birthDate"]!==null) ? text["birthDate"]: "",
                                state: (updatedFields["state"]!==null) ? text["state"]: "",
                                city: (updatedFields["city"]!==null) ? text["city"]: "",
                                zip: (updatedFields["zip"]!==null) ? text["zip"]: "",
                                avatar: this.state.userDetails.avatar,
                                eNumber: this.state.userDetails.eNumber,
                                address1: (updatedFields["address1"]!==null) ? text["address1"]: "",
                                bio: (updatedFields["bio"]!==null) ? text["bio"]: "",
                                link1: (updatedFields["link1"]!==null) ? text["link1"]: "",
                                link3: (updatedFields["link2"]!==null) ? text["link2"]: "",
                                link2: (updatedFields["link3"]!==null) ? text["link3"]: "",
                            }
                        })
                    }

                }).catch((e) => {
                console.warn('There was an error saving user details: ', e)

                this.setState({
                    error: 'There was an error saving user details.'
                })
            });
        }
        else
        {
            //TODO Email or URL is invalid
            alert("Email or URL is invalid");
        }
    }

    getUserDetails(){
        const headers = new Headers();
        headers.append('Authorization', 'Bearer '+sessionStorage.getItem("token"));
        const init = {
            method: 'GET',
            headers
        };
    
        fetch('https://cooliocoders.ddns.net/api/user/profile', init)
        .then( async (response) => {
            const text = await response.json();
            if(response.status === 200){
                this.setState({userDetails:
                    {
                        email: (text["email"]!==null) ? text["email"]: "",
                        firstName: (text["firstName"]!==null) ? text["firstName"]: "",
                        lastName: (text["lastName"]!==null) ? text["lastName"]: "",
                        phone: (text["phone"]!==null) ? text["phone"]: "",
                        birthDate: (text["birthDate"]!==null) ? text["birthDate"]: "",
                        state: (text["state"]!==null) ? text["state"]: "",
                        city: (text["city"]!==null) ? text["city"]: "",
                        zip: (text["zip"]!==null) ? text["zip"]: "",
                        avatar: (text["avatar"]!==null) ? text["avatar"]: "",
                        eNumber: (text["id"]),
                        address1: (text["address1"]!==null) ? text["address1"]: "",
                        bio: (text["bio"]!==null) ? text["bio"]: "",
                        link1: (text["link1"]!==null) ? text["link1"]: "",
                        link3: (text["link2"]!==null) ? text["link2"]: "",
                        link2: (text["link3"]!==null) ? text["link3"]: "",
                    }
                })
            }
        })
        .catch((e) => {
            console.warn('There was an error retrieving user details: ', e)

            this.setState({
                error: 'There was an error retrieving user details.'
            })
        }); 
    }

    componentDidMount() {
        this.getUserDetails();
    }

    render() {
        const { classes } = this.props
        return (
            <div className={classes.main}>
                <UserDetails details={this.state.userDetails} updateCallback={this.initializeUserChanges} updateFileCallback={this.initializeAvatarChange}/>
            </div>
        );
    }
}

export default withStyles(styles)(Profile);