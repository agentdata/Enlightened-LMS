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

        this.getUserDetails = this.getUserDetails.bind(this);
        this.setUserDetails = this.setUserDetails.bind(this);
    }

    // initializeAvatarChange -- called by UserDetails->FileUploader child component
    initializeAvatarChange = (avatar, displayAvatar) => {
        
        this.setState((prevState) => ({
            userDetails: {
                ...prevState.userDetails,
                avatar: displayAvatar
            }
        }));

        this.setUserAvatar(avatar);
    }

    // update user avatar (independent of rest of user profile)
    setUserAvatar(avatar) {
        console.log(avatar);

        let reader = new FileReader();
        reader.readAsDataURL(avatar);
        reader.onloadend = () => {

            console.log(JSON.stringify(reader.result));

            var statusCode;
            const headers = new Headers();
            headers.append('Authorization', 'Bearer ' + sessionStorage.getItem("token"));
            headers.append('Content-Type', 'application/json');
            headers.append('Access-Control-Allow-Origin', '*');
            headers.append('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');

            const init = {
                method: 'PUT',
                headers,
                body: JSON.stringify({"avatar": reader.result} )
            };

        fetch('https://cooliocoders.ddns.net/api/user/profile/avatar', init)
            .then(async response => {
                const text = await response.json();
                statusCode = response.status;

                    this.setState((prevState) => ({
                        userDetails: {
                            ...prevState.userDetails,
                            avatar: text["avatar"]
                        }
                    }))
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

        this.setState({
            userDetails: updatedFields,
        })

        this.setUserDetails(updatedFields)
    }

    // implement post api call to update user profile - child component uses callback
    setUserDetails(updatedFields) {
        // set the state to reflect changes based on user input

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
            headers.append('Access-Control-Allow-Origin','*');
            headers.append('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, OPTIONS');
            const init = {
                method: 'PUT',
                headers,
                body: JSON.stringify(updatedFields)
            };

            fetch('https://cooliocoders.ddns.net/api/user/profile', init)
                .then(async response => {
                    const text = await response.json();
                    statusCode = response.status;

                    this.setState({userDetails:
                            {
                                email: text["email"],
                                firstName: text["firstName"],
                                lastName: text["lastName"],
                                phone: text["phone"],
                                birthDate: text["birthDate"],
                                state: text["state"],
                                city: text["city"],
                                zip: text["zip"],
                                address1: text["address1"],
                                bio: text["bio"],
                                avatar: text["avatar"],
                                link1: text["link1"],
                                link3: text["link3"],
                                link2: text["link2"]
                            }
                    })
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
        var statusCode;
        const headers = new Headers();
        headers.append('Authorization', 'Bearer '+sessionStorage.getItem("token"));
        headers.append('Access-Control-Allow-Origin','*');
        headers.append('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, OPTIONS');
        const init = {
            method: 'GET',
            headers
        };
    
        fetch('https://cooliocoders.ddns.net/api/user/profile', init)
        .then((response) => {
            statusCode = response.status;
            return response.json(); // or .text() or .blob() ...
        })
        .then((text) => this.setState({userDetails:
                {
                    email: text["email"],
                    firstName: text["firstName"],
                    lastName: text["lastName"],
                    phone: text["phone"],
                    birthDate: text["birthDate"],
                    state: text["state"],
                    city: text["city"],
                    zip: text["zip"],
                    address1: text["address1"],
                    bio: text["bio"],
                    avatar: text["avatar"],
                    link1: text["link1"],
                    link3: text["link3"],
                    link2: text["link2"]
                }
            }
        ))
        .catch((e) => {
            console.warn('There was an error retrieving user details: ', e)

            this.setState({
                error: 'There was an error retrieving user details.'
            })
        }); 
    }

    // check that the user is logged in before component is loaded into DOM
    componentDidMount() {
        // this.setState(state => ({
        //     isLoggedIn: true // call method from user/authentication controller/service
        // }));
        this.getUserDetails();
        console.log("current state.userDetails : "+JSON.stringify(this.state.userDetails));
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