import React, { Component } from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import {
  ChordEditor,
  Footer,
  Header,
  SongList,
  Login,
  Logout,
  LoadingSpinner
} from "./components-practice";
import { app, base } from "./base-learn";

function AuthenticatedRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        authenticated === true ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
}

function SongsRoute({ component: Component, items, params, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ match, ...props }) => {
        if (rest.requireAuth === true && !rest.authenticated) {
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          );
        }

        const item = item[match.params[params]];
        if (item) {
          return <Component item={item} {...props} match={match} {...rest} />;
        } else {
          return <h1>Not found</h1>;
        }
      }}
    />
  );
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.updateSong = this.updateSong.bind(this);
    this.addSong = this.addSong.bind(this);
    this.setCurrentUser = this.setCurrentUser.bind(this);
    this.state = {
      authenticated: false,
      currentUser: null,
      songs: {},
      loading: true
    };
  }

  componentWillMount() {
    this.removeAuthListener = app.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          authenticated: true,
          currentUser: user,
          loading: false
        });
        this.songsRef = base.syncState(`songs/${user.uid}`, {
          context: this,
          state: "songs"
        });
      } else {
        this.setState({
          authenticated: false,
          currentUser: null,
          loading: false
        });
        base.removeBinding(this.songsRef);
      }
    });
  }

  componentWillUnmount() {
    this.removeAuthListener();
  }

  addSong(title) {
    const songs = { ...this.state.songs };
    const id = Date.now();
    songs[id] = {
      id: id,
      title: title,
      chordpro: "",
      owner: this.state.currentUser.uid
    };
    this.setState({ songs });
  }

  setCurrentUser(user) {
    if (user) {
      this.setState({
        currentUser: user,
        authenticated: true
      });
    } else {
      this.setState({
        currentUser: null,
        authenticated: false
      });
    }
  }

  updateSong(song) {
    const songs = { ...this.state.songs };
    songs[song.id] = song;
    this.setState({
      songs
    });
  }

  render() {
    if (this.state.loading === true) {
      return <LoadingSpinner text="Loading" />;
    }
    return (
      <div style={{ maxWidth: "1160px", margin: "0 auto" }}>
        <BrowserRouter>
          <div>
            <Header
              authenticated={this.state.authenticated}
              addSong={this.addSong}
            />
            <div className="main-content" style={{ paddingTop: "1em" }}>
              <div className="workspace">
                <Route
                  exact
                  path="/login"
                  render={props => {
                    return (
                      <Login setCurrentUser={this.setCurrentUser} {...props} />
                    );
                  }}
                />
                <Route exact path="/logout" component={Logout} />
                <AuthenticatedRoute
                  exact
                  path="/songs"
                  component={SongList}
                  authenticated={this.state.authenticated}
                  songs={this.state.songs}
                />
                <SongsRoute
                  path="/songs/:songId"
                  authenticated={this.state.authenticated}
                  component={ChordEditor}
                  requireAuth={true}
                  param="songId"
                  updateSong={this.updateSong}
                  items={this.state.songs}
                />
              </div>
            </div>
          </div>
        </BrowserRouter>
        <Footer />
      </div>
    );
  }
}
