import React, { useState, useContext, useEffect } from "react";

// Stylesheet
import "./Overview.css";

// Line Chart
import { ResponsiveLine } from "@nivo/line";
import { ResponsiveBump } from "@nivo/bump";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { Context } from "../../../../context/Context";

const Overview = () => {
  const normalize = (array, number) => {
    var max = array[0];
    var min = array[0];

    for (var i = 0; i < array.length; i++) max = Math.max(max, array[i]);
    for (var i = 0; i < array.length; i++) min = Math.min(min, array[i]);

    var a = 1;
    var b = 4;

    var numerator = number - min;
    var denom = max - min;

    var res = (b - a) * (numerator / denom) + a;
    console.log(res);
    return parseFloat(res).toFixed(0);
  };

  const { thisMonthTweets } = useContext(Context);
  const [data, setData] = useState([]);
  const [hashtagsData, setHashtagsData] = useState([]);

  const [barData, setBarData] = useState([]);

  const setDataForOverallSentiment = () => {
    var overallData = [{ id: "", color: "hsl(200, 70%, 50%)", data: [] }];
    Object.keys(thisMonthTweets.weeklyScore).forEach((key) => {
      var subData = {};
      subData.x = key;
      subData.y = parseFloat(thisMonthTweets.weeklyScore[key] * 100).toFixed(0);
      overallData[0].data.push(subData);
    });
    setData(overallData);
  };

  const setDataForHashtags = () => {
    var overallData = [{ id: "", color: "hsl(200, 70%, 50%)", data: [] }];
    Object.keys(thisMonthTweets.hashtags).forEach((key) => {
      var subData = {};
      subData.x = key;
      subData.y = thisMonthTweets.hashtags[key];
      overallData[0].data.push(subData);
    });
    setHashtagsData(overallData);
  };

  const setBumpChartData = () => {
    var overallData = [];
    Object.keys(thisMonthTweets.weeklyData).forEach((key) => {
      var subData = { id: key, data: [] };
      var arrayList = []; // For normalization
      Object.keys(thisMonthTweets.weeklyData[key]).forEach((emotion) => {
        arrayList.push(thisMonthTweets.weeklyData[key][emotion]);
      });
      Object.keys(thisMonthTweets.weeklyData[key]).forEach((emotion) => {
        var emotionData = {};
        emotionData.x = emotion;
        emotionData.y = normalize(
          arrayList,
          thisMonthTweets.weeklyData[key][emotion]
        );
        subData.data.push(emotionData);
      });
      overallData.push(subData);
    });

    setBarData(overallData);
    // console.log(overallData);
  };
  useEffect(() => {
    setBumpChartData();
    setDataForOverallSentiment();
    setDataForHashtags();
  }, []);
  return (
    <div className="main-content">
      <div className="initial-statistics-grid grid-container">
        {/* <button onClick={setBumpChartData}></button> */}
        {/* First Column */}
        <div className="grid-item" style={{ height: 150 }}>
          <p className="statistics-title">
            {thisMonthTweets.totalTweets}
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
              legend: "Overall sentiment (in terms of weeks)",
              legendOffset: 36,
              legendPosition: "middle",
            }}
            axisLeft={null}
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

          {/* <div className="grid-container">
            <div className="grid-item">
              <p className="sub-stats">
                <span className="sub-stats-bold">Positive</span> <br />{" "}
                <small>20%</small>
              </p>
            </div>
            <div>
              <p className="sub-stats">
                <span className="sub-stats-bold">Negative</span> <br />{" "}
                <small>20%</small>
              </p>
            </div>
            <div>
              <p className="sub-stats">
                <span className="sub-stats-bold">Neutral</span> <br />{" "}
                <small>20%</small>
              </p>
            </div>
          </div> */}
        </div>

        {/* Second Column */}
        <div className="grid-item" style={{ height: 150 }}>
          <p className="statistics-title">
            {thisMonthTweets.analyzedUsers}
            <br />
            <small className="small">Users Analyzed</small>
          </p>
          <ResponsiveLine
            data={hashtagsData}
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
              legend: "Frequency of hastags",
              legendOffset: 36,
              legendPosition: "middle",
            }}
            axisLeft={null}
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
        <div className="grid-item" style={{ height: 300, marginTop: 40 }}>
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

      {/* Table */}
      <div className="table" style={{ marginTop: 150 }}>
        <div className="table-wrapper">
          <h3 style={{ color: "#6F787F" }}>Search Tweets</h3>
          <input
            type="text"
            className="input-field"
            placeholder="Search here..."
          />
          <select className="select-field">
            <option>Positive</option>
            <option>Negative</option>
            <option>Neutral</option>
          </select>
          <div className="grid-container form-wrapper">
            <div className="grid-item"></div>
          </div>
          <table>
            <tr>
              <th>Username</th>
              <th>Tweet</th>
              <th>Sentiment</th>
            </tr>
            <tr>
              <td>Alfreds Futterkiste</td>
              <td>Maria Anders</td>
              <td>Germany</td>
            </tr>
            <tr>
              <td>Centro comercial Moctezuma</td>
              <td>Francisco Chang</td>
              <td>Mexico</td>
            </tr>
            <tr>
              <td>Ernst Handel</td>
              <td>Roland Mendel</td>
              <td>Austria</td>
            </tr>
            <tr>
              <td>Island Trading</td>
              <td>Helen Bennett</td>
              <td>UK</td>
            </tr>
            <tr>
              <td>Laughing Bacchus Winecellars</td>
              <td>Yoshi Tannamuri</td>
              <td>Canada</td>
            </tr>
            <tr>
              <td>Magazzini Alimentari Riuniti</td>
              <td>Giovanni Rovelli</td>
              <td>Italy</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Overview;
