import React from 'react';
// import logo from './logo.svg';
import './App.css';

import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./components/Home";
import Login from "./components/Login";
import CoursePage from "./components/course/CoursePage";

function App(props) {
  // props
  const { isAuthenticated, isVerifying } = props;

  return (
    // returns protected route if user authenticated, otherwise login page
    // <div className="App">
    //   <Switch>
    //     <ProtectedRoute
    //       exact
    //       path="/"
    //       component={Home}
    //       isAuthenticated={isAuthenticated}
    //       isVerifying={isVerifying}
    //     />
    //     <Route path="/login" component={Login} />
    //   </Switch>
    // </div>
    <CoursePage></CoursePage>
  );
}
// maps state to App props
function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isVerifying: state.auth.isVerifying
  };
}
export default connect(mapStateToProps)(App);
