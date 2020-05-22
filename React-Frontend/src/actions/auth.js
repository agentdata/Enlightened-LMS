export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCEED = "LOGIN_SUCCEED";
export const LOGIN_FAIL = "LOGIN_FAIL";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCEED = "LOGOUT_SUCCEED";
export const LOGOUT_FAIL = "LOGOUT_FAIL";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCEED = "REGISTER_SUCCEED";
export const REGISTER_FAIL = "REGISTER_FAIL";

export const VERIFY_REQUEST = "VERIFY_REQUEST";
export const VERIFY_SUCCEED = "VERIFY_SUCCEED";

/* #region Login States */
const requestLogin = () => {
    return {
        type: LOGIN_REQUEST
    };
}

const successfulLogin = user => {
    return {
        type: LOGIN_SUCCEED,
        user
    };
};

const loginError = () => {
    return {
        type: LOGIN_FAIL
    };
};
/* #endregion */

/* #region Logout States */
const requestLogout = () => {
    return {
        type: LOGOUT_REQUEST
    };
};

const successfulLogout = user => {
    return {
        type: LOGOUT_SUCCEED,
        user
    };
};

const logoutError = () => {
    return {
        type: LOGOUT_FAIL
    };
};
/* #endregion */

/* #region Registration States */
const requestRegister = user => {
    return {
        type: REGISTER_REQUEST,
        user
    };
}

const successfulRegister = user => {
    return {
        type: REGISTER_SUCCEED,
        user
    }
}

const registerError = () => {
    return {
        type: REGISTER_FAIL
    }
}
/* #endregion */

export const loginUser = (email, password) => dispatch => {
    dispatch(requestLogin());

    // TODO: send sign in info to back end and get info for state
    var loggedIn = false;
    var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (emailRegex.test(String(email).toLowerCase()) && password === "password"){  
        loggedIn = true;
    }

    if (loggedIn) {
        // TODO: update view, get info from backend
        console.log("logged in");
        var user = {email: email, password: password};
        dispatch(successfulLogin(user));
    } else {
        // TODO: show error
        dispatch(loginError());
        console.log("not logged in");
    }
}

export const logoutUser = () => dispatch => {
    dispatch(requestLogout());

    // TODO: attempt to log out
    var loggedOut = true;

    // if user is logged out
    if (loggedOut) {
        // TODO: update view
        console.log("logged out");
        dispatch(successfulLogout());
    } else {
        console.log("not logged out");
        dispatch(logoutError());
    }
}

export const registerUser = (firstName, lastName, birthDate, email, password) => dispatch => {
    dispatch(requestRegister());

    // TODO: send info to backend to attempt to register user 
    var registered = false;
    var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var nameRegex = /^[a-zA-Z ]+$/;

    // Grab today's day and format it to yyyy/mm/dd
    var currentDate = new Date();
    var year = String(currentDate.getFullYear());
    var month = String(currentDate.getMonth() + 1).padStart(2, 0);
    var day = String(currentDate.getDate()).padStart(2, 0);
    currentDate = year + '-' + month + '-' + day;

    // Flags for validating input
    var name = false;
    var date = false;
    var emailV = false;
    var password = false;

    if(firstName != null && lastName != null)  
    {
        if(nameRegex.test(firstName) && nameRegex.test(lastName))
        {
            name = true;
        }
    }
    if(emailRegex.test(String(email).toLowerCase()))
        emailV = true;

    if(birthDate < currentDate)
    {
        date = true;
    }
        

    // Validation Output
    console.log("BirthDate: " + birthDate + "\nCurrentDate: " + currentDate + "\n")

    console.log(
        "Name: " + name +
        "\nDate: " + date +
        "\nEmail: " + emailV +
        "\nPassword: " + password
    );
    

    // if user is registered and returned
    if (registered) {
        // TODO: update view, get info from backend
        // TODO: determine email verification requirements, possiblly
        // call loginUser directly after registration
        console.log("registered");
        dispatch(successfulRegister());
    } else {
        // TODO: show error
        console.log("not registered");
        dispatch(registerError());
    }

}


