import React, { Component } from "react";

export default class Footer extends Component {
    constructor(props){
        super(props);

        this.state = {
            year: new Date().getFullYear()
        }
    }
  render() {
    return (
      <div>
        <footer>
          <ul>
              <li>
                  &copy; {this.state.year}
              </li>
          </ul>
        </footer>
      </div>
    );
  }
}
