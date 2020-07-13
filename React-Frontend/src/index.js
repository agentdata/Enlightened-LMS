import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import configureStore from "./configureStore";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import http from './api/http'
import {LOGIN_SUCCEED, LOGIN_REQUEST, LOGIN_FAIL} from './actions/auth'

import App from "./App";

const store = configureStore();

if(sessionStorage.getItem("token")){
  store.dispatch({ type: LOGIN_REQUEST })
  http.validateToken()     
      .then( async(response) => {
          var body = await response.json();
          if(response.status === 200 && body["message"] === "Token is valid."){
            console.log("token valid");
            //set isAuthenticated
            store.dispatch({
              type: LOGIN_SUCCEED
            })
          }
          else{
            store.dispatch({
              type: LOGIN_FAIL
            })
          }
      })
      .catch((e) => {
          store.dispatch({
            type: LOGIN_FAIL
          })
          console.warn("There was an error checking token: ", e);
      })
  // dispatch(successfulLogin());
}

// renders main App with store as provider
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
