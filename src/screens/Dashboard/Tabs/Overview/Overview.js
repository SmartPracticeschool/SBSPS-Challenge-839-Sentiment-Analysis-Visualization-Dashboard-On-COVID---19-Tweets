import React, { useState } from "react";

// Stylesheet
import "./Overview.css";

// Line Chart
import { ResponsiveLine } from "@nivo/line";
import { ResponsiveBump } from "@nivo/bump";

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

  const [barData, setBarData] = useState([
    {
      id: "Serie 1",
      data: [
        {
          x: 2000,
          y: 12,
        },
        {
          x: 2001,
          y: 1,
        },
        {
          x: 2002,
          y: 6,
        },
        {
          x: 2003,
          y: 9,
        },
        {
          x: 2004,
          y: 6,
        },
      ],
    },
    {
      id: "Serie 2",
      data: [
        {
          x: 2000,
          y: 11,
        },
        {
          x: 2001,
          y: 2,
        },
        {
          x: 2002,
          y: 12,
        },
        {
          x: 2003,
          y: 8,
        },
        {
          x: 2004,
          y: 10,
        },
      ],
    },
    {
      id: "Serie 3",
      data: [
        {
          x: 2000,
          y: 8,
        },
        {
          x: 2001,
          y: 7,
        },
        {
          x: 2002,
          y: 8,
        },
        {
          x: 2003,
          y: 6,
        },
        {
          x: 2004,
          y: 4,
        },
      ],
    },
    {
      id: "Serie 4",
      data: [
        {
          x: 2000,
          y: 1,
        },
        {
          x: 2001,
          y: 12,
        },
        {
          x: 2002,
          y: 7,
        },
        {
          x: 2003,
          y: 10,
        },
        {
          x: 2004,
          y: 2,
        },
      ],
    },
    {
      id: "Serie 5",
      data: [
        {
          x: 2000,
          y: 10,
        },
        {
          x: 2001,
          y: 5,
        },
        {
          x: 2002,
          y: 10,
        },
        {
          x: 2003,
          y: 7,
        },
        {
          x: 2004,
          y: 11,
        },
      ],
    },
    {
      id: "Serie 6",
      data: [
        {
          x: 2000,
          y: 2,
        },
        {
          x: 2001,
          y: 10,
        },
        {
          x: 2002,
          y: 11,
        },
        {
          x: 2003,
          y: 5,
        },
        {
          x: 2004,
          y: 7,
        },
      ],
    },
    {
      id: "Serie 7",
      data: [
        {
          x: 2000,
          y: 3,
        },
        {
          x: 2001,
          y: 9,
        },
        {
          x: 2002,
          y: 3,
        },
        {
          x: 2003,
          y: 1,
        },
        {
          x: 2004,
          y: 9,
        },
      ],
    },
    {
      id: "Serie 8",
      data: [
        {
          x: 2000,
          y: 9,
        },
        {
          x: 2001,
          y: 11,
        },
        {
          x: 2002,
          y: 2,
        },
        {
          x: 2003,
          y: 3,
        },
        {
          x: 2004,
          y: 12,
        },
      ],
    },
    {
      id: "Serie 9",
      data: [
        {
          x: 2000,
          y: 7,
        },
        {
          x: 2001,
          y: 8,
        },
        {
          x: 2002,
          y: 1,
        },
        {
          x: 2003,
          y: 4,
        },
        {
          x: 2004,
          y: 1,
        },
      ],
    },
    {
      id: "Serie 10",
      data: [
        {
          x: 2000,
          y: 5,
        },
        {
          x: 2001,
          y: 4,
        },
        {
          x: 2002,
          y: 5,
        },
        {
          x: 2003,
          y: 11,
        },
        {
          x: 2004,
          y: 3,
        },
      ],
    },
    {
      id: "Serie 11",
      data: [
        {
          x: 2000,
          y: 4,
        },
        {
          x: 2001,
          y: 6,
        },
        {
          x: 2002,
          y: 9,
        },
        {
          x: 2003,
          y: 2,
        },
        {
          x: 2004,
          y: 5,
        },
      ],
    },
    {
      id: "Serie 12",
      data: [
        {
          x: 2000,
          y: 6,
        },
        {
          x: 2001,
          y: 3,
        },
        {
          x: 2002,
          y: 4,
        },
        {
          x: 2003,
          y: 12,
        },
        {
          x: 2004,
          y: 8,
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

      {/* Bar Chart */}
      <div className="grid-container">
        <div className="grid-item" style={{ height: 300, marginTop: 20 }}>
          <h5 className="title">Emotions among people (Jan)</h5>
          <ResponsiveBump
            data={barData}
            margin={{ top: 20, right: 100, bottom: 40, left: 60 }}
            colors={{ scheme: "spectral" }}
            lineWidth={3}
            activeLineWidth={6}
            inactiveLineWidth={3}
            inactiveOpacity={0.15}
            pointSize={10}
            activePointSize={16}
            inactivePointSize={0}
            pointColor={{ theme: "background" }}
            pointBorderWidth={3}
            activePointBorderWidth={3}
            pointBorderColor={{ from: "serie.color" }}
            axisTop={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "",
              legendPosition: "middle",
              legendOffset: -36,
            }}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "",
              legendPosition: "middle",
              legendOffset: 32,
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "ranking",
              legendPosition: "middle",
              legendOffset: -40,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Overview;
