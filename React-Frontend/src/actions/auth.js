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

export const loginError = () => {
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

    var statusCode;
    var user = {email: email, password: password};

    //build http request
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const body = JSON.stringify({
        "email": email,
        "password": password
    });

    const init = {
    method: 'POST',
    headers,
    body
    };

    //send HTTP request
    fetch('https://cooliocoders.ddns.net/api/auth/login', init).then((response) => {
        statusCode = response.status;
        return response.json(); // or .text() or .blob() ...
    }).then((text) => {
        // text is the response body
        if (statusCode === 200) {
            // TODO: update view, get info from backend
            // console.log("login success, token is: " + text["token"]);
            sessionStorage.setItem('token', text["token"])
            
        } else {
            // TODO: show error
            console.log("not logged in");
            dispatch(loginError());
        }
    }).catch((e) => {
        // error in e.message
    });
    dispatch(successfulLogin(user));
}

export const logoutUser = () => dispatch => {
    dispatch(requestLogout());

    // TODO: invalidate token with api call on server
    // TODO: reset local session
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

export const registerUser = (firstName, lastName, birthDate, email, password, instructorCheckmarkBox) => dispatch => {
    dispatch(requestRegister());

    var statusCode;
    
    //build HTTP request
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const body = JSON.stringify({
        "firstName": firstName,
        "lastName": lastName,
        "birthDate": birthDate,
        "email": email,
        "password": password,
        "roles": [{"role": instructorCheckmarkBox ? "INSTRUCTOR":"STUDENT"}]
    });
    const init = {
        method: 'POST',
        headers,
        body
    };

    //send HTTP Request
    fetch('https://cooliocoders.ddns.net/api/auth/register', init).then((response) => {
        statusCode = response.status;
        return response.json(); // or .text() or .blob() ...
    }).then((text) => {
        // text is the response body, check for successful registration
        
        //if status code === 200 then user successfully registered
        if(statusCode === 200 && text["message"] === "User registered successfully"){
            // TODO: update view, get info from backend
            // TODO: determine email verification requirements, possibly
            dispatch(successfulRegister());

            // call loginUser directly after registration
            
        } else {
            // TODO: show error
            console.log("user not registered");
            dispatch(registerError());
        }
    }).catch((e) => {
        // error in e.message
    });
}
