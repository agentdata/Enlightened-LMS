import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({
    component: Component,
    isAuthenticated,
    isLoggingIn,
    ...rest
}) => (
    <Route
        {...rest}
        render={props =>
            isLoggingIn ? (
                <div>loading</div>
            ) : isAuthenticated ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/login",
                        state: { from: props.location }
                    }}
                />
            )
        }
    />
)

export default ProtectedRoute;
