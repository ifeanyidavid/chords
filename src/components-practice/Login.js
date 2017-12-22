import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Toaster, Intent } from "@blueprintjs/core";
import { app, facebookProvider } from "../base-learn";

const loginStyles = {
  width: "90%",
  maxWidth: "315px",
  margin: "20px auto",
  border: "1px solid #ddd",
  borderRadius: "5px",
  padding: "10px"
};

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.authWithEmailPassword = this.authWithEmailPassword.bind(this);
    this.authWithFacebook = this.authWithFacebook.bind(this);

    this.state = {
      redirect: false
    };
  }

  authWithEmailPassword(e) {
    e.preventDefault();
    const email = this.emailInput.value;
    const password = this.passwordInput.value;

    app
      .auth()
      .fetchProvidersForEmail(email)
      .then(provider => {
        if (provider.length === 0) {
          //   create user
          return app.auth().createUserWithEmailAndPassword(email, password);
        } else if (provider.indexOf("password") === -1) {
          //   they used facebook
          this.loginForm.reset();
          this.toaster.show({
            intent: Intent.WARNING,
            message: "Try an alternative login"
          });
        } else {
          //   sign user in
          return app.auth().signInWithEmailAndPassword(email, password);
        }
      })
      .then(user => {
        if (user && user.email) {
          this.loginForm.reset();
          this.props.setCurrentUser(user);
          this.setState({ redirect: true });
        }
      })
      .catch(error => {
        this.toaster.show({ intent: Intent.DANGER, message: error.message });
      });
  }

  authWithFacebook() {
    app
      .auth()
      .signInWithPopup(facebookProvider)
      .then((user, result, error) => {
        if (error) {
          this.toaster.show({
            intent: Intent.DANGER,
            message: "Unable to sign in with Facebook"
          });
        } else {
          this.props.setCurrentUser(user);
          this.setState({ redirect: true });
        }
      });
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    if (this.state.redirect === true) {
      return <Redirect to={from} />;
    }
    return (
      <div style={loginStyles}>
        <Toaster
          ref={element => {
            this.toaster = element;
          }}
        />
        <button
          className="pt-button pt-intent-primary"
          onClick={() => {
            this.authWithFacebook();
          }}
          style={{ width: "100%" }}
        >
          Login with Facebook
        </button>
        <hr style={{ marginTop: "10px", marginBottom: "10px" }} />
        <form
          onSubmit={event => {
            this.authWithEmailPassword(event);
          }}
          ref={form => {
            this.loginForm = form;
          }}
        >
          <div className="pt-callout pt-icon-info-sign">
            <h5>Note</h5>
            If you don't have an account already, we'll create one for you.
          </div>
          <label className="pt-label">
            <input
              type="email"
              className="pt-input"
              name="email"
              ref={input => {
                this.emailInput = input;
              }}
              placeholder="Email"
              style={{ width: "100%" }}
            />
          </label>
          <label className="pt-label">
            <input
              type="password"
              className="pt-input"
              name="password"
              ref={input => {
                this.passwordInput = input;
              }}
              placeholder="Password"
              style={{ width: "100%" }}
            />
          </label>
          <button
            className="pt-button pt-intent-primary"
            style={{ width: "100%" }}
            type="Submit"
          >
            Login/Register
          </button>
        </form>
      </div>
    );
  }
}
