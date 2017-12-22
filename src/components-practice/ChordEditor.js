import React, { Component } from "react";
import ChordSheetJS from "chordsheetjs";
import { Breadcrumb } from "@blueprintjs/core";

export default class ChordEditor extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.getChordMarkup = this.getChordMarkup.bind(this);
  }
  handleChange(e) {
    const song = { ...this.props.song };
    song.chordpro = e.target.value;
    this.props.updateSong(song);
  }

  getChordMarkup() {
    const formatter = new ChordSheetJS.HtmlFormatter();
    const parser = new ChordSheetJS.ChordProParser();
    const song = parser.parse(this.props.song.chordpro);
    return { __html: formatter.format(song) };
  }

  render() {
    const { item: song } = this.props;
    return (
      <div>
        <ul className="pt-breadcrumbs">
          <li>
            <Breadcrumb href="/songs" text="Songs" />
          </li>
          <li>
            <Breadcrumb href="#" text={song.title} />
          </li>
        </ul>
        <h2 style={{ margin: "0.5em 0" }}>{song.title}</h2>
        <div className="chord-editor">
          <div className="panel">
            <textarea
              style={{ width: "100%", height: "100%" }}
              name="textInput"
              cols="30"
              rows="10"
              onChange={this.handleChange}
              value={song.chordpro}
              placeholder="Type your lyrics here"
            />
          </div>
          <div className="panel">
            <h3>Output</h3>
            <div
              style={{ width: "100%", height: "100%", fontFamily: "monospace" }}
              className="chord-output"
              dangerouslySetInnerHTML={this.getChordMarkup()}
            />
          </div>
        </div>
      </div>
    );
  }
}
