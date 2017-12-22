import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Popover, PopoverInteractionKind, Position } from "@blueprintjs/core";
import NewSongForm from "./NewSongForm";

export default class Header extends Component {
  constructor(props){
    super(props);
    this.closePopover = this.closePopover.bind(this);
    this.state = {
      popoverOpen: false
    }
  }
  closePopover(){
    this.setState({
      popoverOpen: false
    })
  }
  render() {
    return (
      <div>
        <nav className="pt-navbar">
          <div className="pt-navbar-group pt-align-left">
            <Link to="/songs" className="pt-navbar-heading">
              Chord creator
            </Link>
            {this.props.authenticated ? (
              <input
                type="text"
                className="pt-input"
                placeholder="Search songs..."
              />
            ) : null}
          </div>
          {this.props.authenticated ? (
            <div className="pt-navbar-group pt-align-right">
              <Link className="pt-button pt-minimal pt-icon-music" to="/songs">
                Songs
              </Link>
              <Popover
                content={
                  <NewSongForm
                    addSong={this.props.addSong}
                    postSubmitHandler={this.closePopover}
                  />
                }
                interactionKind={PopoverInteractionKind.CLICK}
                isOpen={this.state.popoverOpen}
                onInteraction={state => this.setState({ popoverOpen: state })}
                position={Position.BOTTOM}
              >
                <button
                  className="pt-button pt-minimal pt-icon-add"
                  aria-label="add new song"
                />
              </Popover>
              <span className="pt-nav-divider" />
              <button className="pt-button pt-minimal pt-icon-user" />
              <button className="pt-button pt-minimal pt-icon-cog" />
              <Link
                className="pt-button pt-minimal pt-icon-log-out"
                to="/logout"
                aria-label="Log out"
              />
            </div>
          ) : (
            <div className="pt-navbar-group pt-align-right">
              <Link className="pt-button pt-intent-primary" to="/login">
                Register/Login
              </Link>
            </div>
          )}
        </nav>
      </div>
    );
  }
}
