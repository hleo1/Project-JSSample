import React, { Component } from "react";
import Header from "./components/header";
import Footer from "./components/footer";
import Control from "./components/control";
import Output from "./components/output";

class App extends Component {
  constructor(props) {
    super(props);
    //set default state of the app. No top/bottom text, as well as no image src

    // to keep uni-directional flow, only these values will be updated by control (through function call)
    // to be viewed in output
    this.state = {
      topText: "",
      bottomText: "",
      imageURL: "",
    };
  }

  //function to change the state of the app (bottom, top, and imageURL respectively)
  updateTextandImage = (bottomText1, topText1, imageURL1) => {
    this.setState({
      bottomText: bottomText1,
      topText: topText1,
      imageURL: imageURL1,
    });
  };
  render() {
    return (
      <>
        <Header />

        {/* Control component collects user input, and fetches the relevant image URL */}
        <Control updateUI={this.updateTextandImage} />

        {/* Output will display whatever user inputs and the relevant image */}
        <Output information={this.state} />
        <Footer />
      </>
    );
  }
}

export default App;
