import React, { useState } from "react";

// Stylesheet
import "./Overview.css";

// Line Chart
import { ResponsiveLine } from "@nivo/line";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsDown } from "@fortawesome/free-solid-svg-icons";

const Overview = () => {
  const [data, setData] = useState([
    {
      id: "japan",
      color: "hsl(200, 70%, 50%)",
      data: [
        {
          x: "plane",
          y: 244,
        },
        {
          x: "helicopter",
          y: 197,
        },
        {
          x: "boat",
          y: 273,
        },
        {
          x: "train",
          y: 278,
        },
        {
          x: "subway",
          y: 294,
        },
      ],
    },
  ]);
  return (
    <div className="main-content">
      <div className="initial-statistics-grid grid-container">
        {/* First Column */}
        <div className="grid-item" style={{ height: 150 }}>
          <p className="statistics-title">
            26, 9000
            <br />
            <small className="small">Tweets Analyzed</small>
          </p>
          <ResponsiveLine
            data={data}
            margin={{ top: 0, right: 110, bottom: 50, left: 0 }}
            xScale={{ type: "point" }}
            yScale={{
              type: "linear",
              min: "auto",
              max: "auto",
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
              legend: "Number of tweets analyzed",
              legendOffset: 36,
              legendPosition: "middle",
            }}
            axisLeft={{
              orient: "left",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "count",
              legendOffset: -40,
              legendPosition: "middle",
            }}
            colors={{ scheme: "dark2" }}
            pointSize={10}
            pointColor={{ theme: "background" }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            pointLabel="y"
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[
              {
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: "left-to-right",
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: "circle",
                symbolBorderColor: "rgba(0, 0, 0, .5)",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemBackground: "rgba(0, 0, 0, .03)",
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
          />
        </div>

        {/* Second Column */}
        <div className="grid-item" style={{ height: 150 }}>
          <p className="statistics-title">
            30, 000
            <br />
            <small className="small">Users Analyzed</small>
          </p>
          <ResponsiveLine
            data={data}
            margin={{ top: 0, right: 110, bottom: 50, left: 0 }}
            xScale={{ type: "point" }}
            yScale={{
              type: "linear",
              min: "auto",
              max: "auto",
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
              legend: "Number of users analyzed",
              legendOffset: 36,
              legendPosition: "middle",
            }}
            axisLeft={{
              orient: "left",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "count",
              legendOffset: -40,
              legendPosition: "middle",
            }}
            colors={{ scheme: "dark2" }}
            pointSize={10}
            pointColor={{ theme: "background" }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            pointLabel="y"
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[
              {
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: "left-to-right",
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: "circle",
                symbolBorderColor: "rgba(0, 0, 0, .5)",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemBackground: "rgba(0, 0, 0, .03)",
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
          />
        </div>

        {/* Third column */}
        <div className="grid-item">
          <h5 className="title">This Month Stats</h5>
          <p className="statistics-title">
            30, 000
            <br />
            <small className="small small-bold-text">
              50 <FontAwesomeIcon icon={faThumbsDown} />
            </small>
          </p>

          <p className="table-text">
            58 <b>Hashtags</b>
          </p>
          <p className="table-text">
            2K+ <b>Mentions</b>
          </p>
          <p className="table-text">
            3K+ <b>Users</b>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Overview;
