import React, { Component } from "react";

const newSongFormStyles = {
  padding: "10px"
};

export default class NewSongForm extends Component {
  constructor(props) {
    super(props);

    this.createSong = this.createSong.bind(this);
  }

  createSong(event) {
    event.preventDefault();
    const title = this.titleInput.value;
    this.props.addSong(title);
    this.songForm.reset();
    this.props.postSubmitHandler();
  }
  render() {
    return (
      <div style={newSongFormStyles}>
        <form
          onSubmit={event => this.createSong(event)}
          ref={form => (this.songForm = form)}
        >
          <label className="pt-label">
            <input
              type="text"
              className="pt-input"
              name="title"
              ref={input => {
                this.titleInput = input;
              }}
              placeholder="Dont stop believing"
              style={{ width: "100%" }}
            />
          </label>
          <button
            className="pt-button pt-intent-primary"
            style={{ width: "100%" }}
            type="Submit"
          >
            Create song
          </button>
        </form>
      </div>
    );
  }
}
