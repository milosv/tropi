import React from "react";
import Websocket from "react-websocket";
import { currencyFormatter } from "./helpers/formatting";
import "./counter.css";

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 90,
      total: 0
    };
  }
  handleData(data) {
    let result = JSON.parse(data);
    this.setState({ count: this.state.count + result.movement });
  }

  render() {
    return (
      <div className="App">
        <h1>{currencyFormatter(this.state.total)}</h1>
        Count: <strong>{this.state.count}</strong>
        <Websocket
          url={`ws://${window.location.hostname}:4000`}
          onMessage={this.handleData.bind(this)}
        />
      </div>
    );
  }
}

export default Counter;
