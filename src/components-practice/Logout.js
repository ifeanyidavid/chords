import React, { Component } from "react";
import { Redirect } from "react-router";
import LoadingSpinner from "./LoadingSpinner";
import {app} from '../base-learn';

export default class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };
  }
  componentWillMount() {
    app
      .auth()
      .signOut()
      .then(user => {
        this.setState({ redirect: true });
      });
  }

  render() {
    if (this.state.redirect === true) {
      return <Redirect to="/" />;
    }
    return <LoadingSpinner text="Logging out" />;
  }
}
