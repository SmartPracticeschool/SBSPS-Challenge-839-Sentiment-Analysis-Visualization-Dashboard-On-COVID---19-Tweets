import React, { useEffect, useState } from "react";
import "./History.css";
import { ResponsiveLine } from "@nivo/line";

const History = () => {
  const [emotions, setEmotions] = useState({});
  const [loading, setLoading] = useState(true);

  const responseData = {
    "2020-06-30": {
      sadness: 0.161487,
      joy: 0.607734,
      fear: 0.139994,
      disgust: 0.111099,
      anger: 0.051704,
    },
    "2020-06-29": {
      sadness: 0.161487,
      joy: 0.607734,
      fear: 0.139994,
      disgust: 0.111099,
      anger: 0.051704,
    },
    "2020-06-28": {
      sadness: 0.161487,
      joy: 0.607734,
      fear: 0.139994,
      disgust: 0.111099,
      anger: 0.051704,
    },
    "2020-06-27": {
      sadness: 0.161487,
      joy: 0.607734,
      fear: 0.139994,
      disgust: 0.111099,
      anger: 0.051704,
    },
    "2020-06-26": {
      sadness: 0.161487,
      joy: 0.607734,
      fear: 0.139994,
      disgust: 0.111099,
      anger: 0.051704,
    },
    "2020-06-25": {
      sadness: 0.161487,
      joy: 0.607734,
      fear: 0.139994,
      disgust: 0.111099,
      anger: 0.051704,
    },
    "2020-06-24": {
      sadness: 0.161487,
      joy: 0.607734,
      fear: 0.139994,
      disgust: 0.111099,
      anger: 0.051704,
    },
    "2020-06-23": {
      sadness: 0.161487,
      joy: 0.607734,
      fear: 0.139994,
      disgust: 0.111099,
      anger: 0.051704,
    },
    "2020-06-22": {
      sadness: 0.161487,
      joy: 0.607734,
      fear: 0.139994,
      disgust: 0.111099,
      anger: 0.051704,
    },
    "2020-06-21": {
      sadness: 0.161487,
      joy: 0.607734,
      fear: 0.139994,
      disgust: 0.111099,
      anger: 0.051704,
    },
    "2020-06-20": {
      sadness: 0.161487,
      joy: 0.607734,
      fear: 0.139994,
      disgust: 0.111099,
      anger: 0.051704,
    },
    "2020-06-19": {
      sadness: 0.225129,
      joy: 0.435498,
      fear: 0.030406,
      disgust: 0.294654,
      anger: 0.104626,
    },
    "2020-06-18": {
      sadness: 0.225129,
      joy: 0.435498,
      fear: 0.030406,
      disgust: 0.294654,
      anger: 0.104626,
    },
    "2020-06-17": {
      sadness: 0.225129,
      joy: 0.435498,
      fear: 0.030406,
      disgust: 0.294654,
      anger: 0.104626,
    },
    "2020-06-16": {
      sadness: 0.225129,
      joy: 0.435498,
      fear: 0.030406,
      disgust: 0.294654,
      anger: 0.104626,
    },
    "2020-06-15": {
      sadness: 0.225129,
      joy: 0.435498,
      fear: 0.030406,
      disgust: 0.294654,
      anger: 0.104626,
    },
    "2020-06-14": {
      sadness: 0.225129,
      joy: 0.435498,
      fear: 0.030406,
      disgust: 0.294654,
      anger: 0.104626,
    },
    "2020-06-13": {
      sadness: 0.225129,
      joy: 0.435498,
      fear: 0.030406,
      disgust: 0.294654,
      anger: 0.104626,
    },
    "2020-06-12": {
      sadness: 0.225129,
      joy: 0.435498,
      fear: 0.030406,
      disgust: 0.294654,
      anger: 0.104626,
    },
    "2020-06-11": {
      sadness: 0.225129,
      joy: 0.435498,
      fear: 0.030406,
      disgust: 0.294654,
      anger: 0.104626,
    },
    "2020-06-10": {
      sadness: 0.225129,
      joy: 0.435498,
      fear: 0.030406,
      disgust: 0.294654,
      anger: 0.104626,
    },
    "2020-06-09": {
      sadness: 0.225129,
      joy: 0.435498,
      fear: 0.030406,
      disgust: 0.294654,
      anger: 0.104626,
    },
    "2020-06-08": {
      sadness: 0.225129,
      joy: 0.435498,
      fear: 0.030406,
      disgust: 0.294654,
      anger: 0.104626,
    },
    "2020-06-07": {
      sadness: 0.225129,
      joy: 0.435498,
      fear: 0.030406,
      disgust: 0.294654,
      anger: 0.104626,
    },
    "2020-06-06": {
      sadness: 0.225129,
      joy: 0.435498,
      fear: 0.030406,
      disgust: 0.294654,
      anger: 0.104626,
    },
    "2020-06-05": {
      sadness: 0.225129,
      joy: 0.435498,
      fear: 0.030406,
      disgust: 0.294654,
      anger: 0.104626,
    },
    "2020-07-08": {
      sadness: 0.2821285,
      joy: 0.07091700000000001,
      fear: 0.1489865,
      disgust: 0.2465125,
      anger: 0.10238249999999999,
    },
  };

  const setData = () => {
    let anger = [
      {
        id: "emotion",
        color: "hsl(129, 70%, 50%)",
        data: [],
      },
    ];
    let fear = [
      {
        id: "emotion",
        color: "hsl(192, 70%, 50%)",
        data: [],
      },
    ];
    let joy = [
      {
        id: "emotion",
        color: "hsl(311, 70%, 50%)",
        data: [],
      },
    ];
    let sad = [
      {
        id: "emotion",
        color: "hsl(252, 70%, 50%)",
        data: [],
      },
    ];
    let disgust = [
      {
        id: "emotion",
        color: "hsl(131, 70%, 50%)",
        data: [],
      },
    ];

    for (let i = 0; i < Object.keys(responseData).length; i = i + 2) {
      let date = Object.keys(responseData)[i];
      anger[0].data.push({
        x: date.split("-")[2],
        y: responseData[date]["anger"],
      });
      fear[0].data.push({
        x: date.split("-")[2],
        y: responseData[date]["fear"],
      });
      sad[0].data.push({
        x: date.split("-")[2],
        y: responseData[date]["sad"],
      });
      joy[0].data.push({
        x: date.split("-")[2],
        y: responseData[date]["joy"],
      });
      disgust[0].data.push({
        x: date.split("-")[2],
        y: responseData[date]["disgust"],
      });
    }
    let emotions = {
      anger,
      fear,
      sad,
      joy,
      disgust,
    };
    setEmotions(emotions);
    setLoading(false);
  };

  useEffect(() => {
    setData();
  });

  if (loading) {
    return (
      <div>
        <p>Loading</p>
      </div>
    );
  } else {
    return (
      <div style={{ marginTop: -18, marginLeft: 20 }}>
        <div className="title-header" style={{ marginLeft: -4 }}>
          <p>History of sentiments throughout the month</p>
        </div>

        <div className="grid-container">
          <div className="grid-item" style={{ marginBottom: 20 }}>
            <div className="card">
              <div className="card-header">
                <p>Anger</p>
              </div>
              <div className="card-content" style={{ height: 250 }}>
                <ResponsiveLine
                  data={emotions.anger}
                  margin={{ top: 10, right: 50, bottom: 50, left: 50 }}
                  xScale={{ type: "point" }}
                  yScale={{
                    type: "linear",
                    min: "0",
                    max: "1",
                    stacked: true,
                    reverse: false,
                  }}
                  axisTop={null}
                  axisRight={null}
                  axisBottom={{
                    orient: "bottom",
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 90,
                    legend: "Date of month",
                    legendOffset: 36,
                    legendPosition: "middle",
                  }}
                  axisLeft={{
                    orient: "left",
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "sentiment level",
                    legendOffset: -40,
                    legendPosition: "middle",
                  }}
                  colors={{ scheme: "nivo" }}
                  pointSize={10}
                  pointColor={{ theme: "background" }}
                  pointBorderWidth={2}
                  pointBorderColor={{ from: "serieColor" }}
                  pointLabel="week"
                  pointLabelYOffset={-12}
                  useMesh={true}
                />
              </div>
            </div>
          </div>
          <div className="grid-item">
            <div className="card">
              <div className="card-header">
                <p>Joy</p>
              </div>
              <div className="card-content" style={{ height: 250 }}>
                <ResponsiveLine
                  data={emotions.joy}
                  margin={{ top: 10, right: 50, bottom: 50, left: 50 }}
                  xScale={{ type: "point" }}
                  yScale={{
                    type: "linear",
                    min: "0",
                    max: "1",
                    stacked: true,
                    reverse: false,
                  }}
                  axisTop={null}
                  axisRight={null}
                  axisBottom={{
                    orient: "bottom",
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 90,
                    legend: "Date of month",
                    legendOffset: 36,
                    legendPosition: "middle",
                  }}
                  axisLeft={{
                    orient: "left",
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "sentiment level",
                    legendOffset: -40,
                    legendPosition: "middle",
                  }}
                  colors={{ scheme: "nivo" }}
                  pointSize={10}
                  pointColor={{ theme: "background" }}
                  pointBorderWidth={2}
                  pointBorderColor={{ from: "serieColor" }}
                  pointLabel="week"
                  pointLabelYOffset={-12}
                  useMesh={true}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="grid-container">
          <div className="grid-item" style={{ marginBottom: 20 }}>
            <div className="card">
              <div className="card-header">
                <p>Disgust</p>
              </div>
              <div className="card-content" style={{ height: 250 }}>
                <ResponsiveLine
                  data={emotions.disgust}
                  margin={{ top: 10, right: 50, bottom: 50, left: 50 }}
                  xScale={{ type: "point" }}
                  yScale={{
                    type: "linear",
                    min: "0",
                    max: "1",
                    stacked: true,
                    reverse: false,
                  }}
                  axisTop={null}
                  axisRight={null}
                  axisBottom={{
                    orient: "bottom",
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 90,
                    legend: "Date of month",
                    legendOffset: 36,
                    legendPosition: "middle",
                  }}
                  axisLeft={{
                    orient: "left",
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "sentiment level",
                    legendOffset: -40,
                    legendPosition: "middle",
                  }}
                  colors={{ scheme: "nivo" }}
                  pointSize={10}
                  pointColor={{ theme: "background" }}
                  pointBorderWidth={2}
                  pointBorderColor={{ from: "serieColor" }}
                  pointLabel="week"
                  pointLabelYOffset={-12}
                  useMesh={true}
                />
              </div>
            </div>
          </div>
          <div className="grid-item">
            <div className="card">
              <div className="card-header">
                <p>Sad</p>
              </div>
              <div className="card-content" style={{ height: 250 }}>
                <ResponsiveLine
                  data={emotions.sad}
                  margin={{ top: 10, right: 50, bottom: 50, left: 50 }}
                  xScale={{ type: "point" }}
                  yScale={{
                    type: "linear",
                    min: "0",
                    max: "1",
                    stacked: true,
                    reverse: false,
                  }}
                  axisTop={null}
                  axisRight={null}
                  axisBottom={{
                    orient: "bottom",
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 90,
                    legend: "Date of month",
                    legendOffset: 36,
                    legendPosition: "middle",
                  }}
                  axisLeft={{
                    orient: "left",
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "sentiment level",
                    legendOffset: -40,
                    legendPosition: "middle",
                  }}
                  colors={{ scheme: "nivo" }}
                  pointSize={10}
                  pointColor={{ theme: "background" }}
                  pointBorderWidth={2}
                  pointBorderColor={{ from: "serieColor" }}
                  pointLabel="week"
                  pointLabelYOffset={-12}
                  useMesh={true}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="grid-container">
          <div className="grid-item" style={{ marginBottom: 20 }}>
            <div className="card">
              <div className="card-header">
                <p>Fear</p>
              </div>
              <div className="card-content" style={{ height: 250 }}>
                <ResponsiveLine
                  data={emotions.fear}
                  margin={{ top: 10, right: 50, bottom: 50, left: 50 }}
                  xScale={{ type: "point" }}
                  yScale={{
                    type: "linear",
                    min: "0",
                    max: "1",
                    stacked: true,
                    reverse: false,
                  }}
                  axisTop={null}
                  axisRight={null}
                  axisBottom={{
                    orient: "bottom",
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 90,
                    legend: "Date of month",
                    legendOffset: 36,
                    legendPosition: "middle",
                  }}
                  axisLeft={{
                    orient: "left",
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "sentiment level",
                    legendOffset: -40,
                    legendPosition: "middle",
                  }}
                  colors={{ scheme: "nivo" }}
                  pointSize={10}
                  pointColor={{ theme: "background" }}
                  pointBorderWidth={2}
                  pointBorderColor={{ from: "serieColor" }}
                  pointLabel="week"
                  pointLabelYOffset={-12}
                  useMesh={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default History;

const data = [
  {
    id: "emotion",
    color: "hsl(0, 100%, 50%)",
    data: [
      {
        x: "03",
        y: 60,
      },
      {
        x: "06",
        y: 20,
      },
      {
        x: "09",
        y: 29,
      },
      {
        x: "12",
        y: 67,
      },
      {
        x: "15",
        y: 28,
      },
      {
        x: "18",
        y: 12,
      },
      {
        x: "21",
        y: 25,
      },
      {
        x: "24",
        y: 29,
      },
      {
        x: "27",
        y: 24,
      },
      {
        x: "30",
        y: 10,
      },
    ],
  },
];
