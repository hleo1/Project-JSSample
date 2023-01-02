import { Component } from "react";
import axios from "axios";

import PropTypes from "prop-types";

class Control extends Component {
  constructor(props) {
    super(props);
    // keep track of what the user actually inputs as Top and Bottom textxs
    this.state = {
      tempTop: "",
      tempBottom: "",
    };
  }

  // asynchrnous function activated when "go button" is pressed
  // fetch the relevant image url, and passes in whatever user inputted and updates app.js' state using updateUI
  displayPicture = async (event) => {
    event.preventDefault();
    const memeAPI = "https://api.imgflip.com/get_memes";

    try {
      const response = await axios.get(`${memeAPI}`);
      const data = response.data;
      //100 memes will be received, let's choose a random one.
      const randomMeme = data.data.memes[Math.floor(Math.random() * 100)];
      this.props.updateUI(
        this.state.tempBottom,
        this.state.tempTop,
        randomMeme.url
      );
    } catch (err) {
      console.log(err);
    }
  };

  // change the values "received" of top and bottom values
  changeTop = (event) => {
    this.setState({ tempTop: event.target.value });
  };
  changeBottom = (event) => {
    this.setState({ tempBottom: event.target.value });
  };

  render() {

    //collect top/bottom text, and update accordingly
    // when "go is pressed", call displayPicture function
    return (
      <section className="section">
        <div className="field has-addons">
          <div className="control is-expanded">
            <input
              className="input is-large is-fullwidth is-family-monospace"
              id="top-input"
              placeholder="Top text"
              type="text"
              value={this.state.tempTop}
              onChange={this.changeTop}
            />
          </div>
        </div>
        <div className="field has-addons">
          <div className="control is-expanded">
            <input
              className="input is-large is-fullwidth is-family-monospace"
              id="bottom-input"
              placeholder="Bottom text"
              type="text"
              value={this.state.tempBottom}
              onChange={this.changeBottom}
            />
          </div>
        </div>
        <div className="field has-addons">
          <div className="control is-expanded">
            <button
              className="button is-link is-large is-fullwidth"
              id="go-btn"
              onClick={this.displayPicture}
            >
              Go!
            </button>
          </div>
        </div>
      </section>
    );
  }
}

export default Control;

Control.propTypes = {
  updateUI: PropTypes.func.isRequired,
};
