import React from "react";

import RTChart from "react-rt-chart";

import "./style.css";

class Chart extends React.Component {
  componentDidMount() {
    setInterval(() => this.forceUpdate(), 3000);
  }

  render() {
    var data = {
      date: new Date(),
      Car:
        this.props.data.score !== undefined
          ? this.props.data.score
          : Math.floor(Math.random() * 10)
    };
    var chart = {
      axis: {
        y: { min: 0, max: 15 }
      },
      point: {
        show: true
      },
      fill: {
        color: "#fff"
      }
    };
    var flow = {
      duration: 200
    };
    return <RTChart chart={chart} fields={["Car"]} data={data} />;
  }
}
export default Chart;
