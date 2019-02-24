import React, { Component } from "react";
import Routes from "./router";

export default class ReRoute extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    console.log("testing");
    return <Routes />;
  }
}
