import React from "react";
import "./History.css";
import { ResponsiveLine } from "@nivo/line";

const History = () => {
  return (
    <div style={{ marginTop: -18 }}>
      <div className="title-header">
        <p>History of sentiments throughout the month</p>
      </div>

      <div className="grid-container">
        <div className="grid-item">
          <div className="card">
            <div className="card-header">
              <p>Anger</p>
            </div>
            <div className="card-content">
              <ResponsiveLine
                data={data}
                margin={{ top: 10, right: 50, bottom: 50, left: 50 }}
                xScale={{ type: "point" }}
                yScale={{
                  type: "linear",
                  min: "0",
                  max: "100",
                  stacked: true,
                  reverse: false,
                }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                  orient: "bottom",
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
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
            <div className="card-content">
              <ResponsiveLine
                data={data}
                margin={{ top: 10, right: 50, bottom: 50, left: 50 }}
                xScale={{ type: "point" }}
                yScale={{
                  type: "linear",
                  min: "0",
                  max: "100",
                  stacked: true,
                  reverse: false,
                }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                  orient: "bottom",
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
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
        <div className="grid-item">
          <div className="card">
            <div className="card-header">
              <p>Disgust</p>
            </div>
            <div className="card-content">
              <ResponsiveLine
                data={data}
                margin={{ top: 10, right: 50, bottom: 50, left: 50 }}
                xScale={{ type: "point" }}
                yScale={{
                  type: "linear",
                  min: "0",
                  max: "100",
                  stacked: true,
                  reverse: false,
                }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                  orient: "bottom",
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
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
            <div className="card-content">
              <ResponsiveLine
                data={data}
                margin={{ top: 10, right: 50, bottom: 50, left: 50 }}
                xScale={{ type: "point" }}
                yScale={{
                  type: "linear",
                  min: "0",
                  max: "100",
                  stacked: true,
                  reverse: false,
                }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                  orient: "bottom",
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
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
        <div className="grid-item">
          <div className="card">
            <div className="card-header">
              <p>Fear</p>
            </div>
            <div className="card-content">
              <ResponsiveLine
                data={data}
                margin={{ top: 10, right: 50, bottom: 50, left: 50 }}
                xScale={{ type: "point" }}
                yScale={{
                  type: "linear",
                  min: "0",
                  max: "100",
                  stacked: true,
                  reverse: false,
                }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                  orient: "bottom",
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
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
