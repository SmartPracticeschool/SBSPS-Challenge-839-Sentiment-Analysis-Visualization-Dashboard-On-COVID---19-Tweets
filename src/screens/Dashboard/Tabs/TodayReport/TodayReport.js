import React, { useState, useContext, useEffect } from "react";

// Stylesheet
import "./TodayReport.css";

// Speedometer
import ReactSpeedometer from "react-d3-speedometer";

// Radar chart
import { Radar } from "react-chartjs-2";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSmileWink,
  faSadTear,
  faSmile,
  faMeh,
  faSadCry,
  faUserAlt,
  faHashtag,
  faRetweet,
} from "@fortawesome/free-solid-svg-icons";

// Charts
import { ResponsiveBar } from "@nivo/bar";
import HeatMap from "./components/HeatMap";
import { ResponsivePie } from "@nivo/pie";

// Context
import { Context } from "../../../../context/Context";

const TodayReport = () => {
  const { todayTweets } = useContext(Context);
  const [data, setData] = useState();
  const [pieChartData, setPieChartData] = useState([]);
  const [radarData, setRadarData] = useState({});

  if (todayTweets.results !== undefined) {
    // Overall score calculation (out of 5)
    var overAllScore = Math.abs(todayTweets.overAllSentimentScore);
    var overAllScoreLabel = todayTweets.overAllSentimentLabel;
    var finalScore;
    var finalLabel;
    var finalLabelColor;

    if (
      overAllScore >= 0.01 &&
      overAllScore <= 0.59 &&
      overAllScoreLabel === "Negative"
    ) {
      finalScore = Math.abs(overAllScore) * 2;
      finalLabel = "Negative";
      finalLabelColor = "#c0392b";
    } else if (
      overAllScore >= 0.06 &&
      overAllScore <= 0.99 &&
      overAllScoreLabel === "Negative"
    ) {
      finalScore = Math.abs(overAllScore) * 2;
      finalLabel = "Negative";
      finalLabelColor = "#e74c3c";
    } else if (
      overAllScore >= 0.01 &&
      overAllScore <= 0.59 &&
      overAllScoreLabel === "Positive"
    ) {
      finalScore = Math.abs(overAllScore) * 2 + 3;
      finalLabel = "Positive";
      finalLabelColor = "#f1c40f";
    } else if (
      overAllScore >= 0.06 &&
      overAllScore <= 0.99 &&
      overAllScoreLabel === "Positive"
    ) {
      finalScore = Math.abs(overAllScore) * 2 + 3;
      finalLabel = "Positive";
      finalLabelColor = "#3498db";
    } else if (overAllScore === 0.0) {
      finalScore = Math.random(0, 0.6) + 2;
      finalLabelColor = "#f39c12";
      finalLabel = "Neutral";
    }
  }

  const prepareRadarData = () => {
    const randomColors = [
      {
        backgroundColor: "rgba(44, 62, 80,0.2)",
        borderColor: "rgb(52, 73, 94)",
        pointBackgroundColor: "rgb(52, 73, 94)",
        pointHoverBorderColor: "rgba(179,181,198,1)",
      },
      {
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        pointBackgroundColor: "rgba(255,99,132,1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(255,99,132,1)",
      },
      {
        backgroundColor: "rgba(41, 128, 185,0.2)",
        borderColor: "rgb(52, 152, 219)",
        pointBackgroundColor: "rgb(52, 152, 219)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(255,99,132,1)",
      },
    ];
    var dataset = [];
    {
      Object.keys(todayTweets.results).map((key, index) => {
        var data = todayTweets.results[key];
        var result = {};
        var emotions = data[0].emotion.document.emotion;
        result["label"] = key;
        result["backgroundColor"] = randomColors[index].backgroundColor;
        result["borderColor"] = randomColors[index].borderColor;
        result["pointBackgroundColor"] =
          randomColors[index].pointBackgroundColor;
        result["pointBorderColor"] = "#fff";
        result["pointHoverBackgroundColor"] = "#fff";
        result["pointHoverBorderColor"] =
          randomColors[index].pointHoverBackgroundColor;
        result["data"] = [
          (emotions.sadness * 100).toFixed(0),
          (emotions.joy * 100).toFixed(0),
          (emotions.fear * 100).toFixed(0),
          (emotions.anger * 100).toFixed(0),
          (emotions.disgust * 100).toFixed(0),
        ];
        dataset.push(result);
      });
      var overallData = {
        labels: ["Sadness", "Joy", "Fear", "Disgust", "Anger"],
        datasets: dataset,
      };
      setRadarData(overallData);
    }
  };
  const setBarChartData = () => {
    var barChartData = [];
    // Prepare data for bar chart

    Object.keys(todayTweets.overAllEmotions).map((eachEmotionKey) => {
      var subData = {};
      subData.id = eachEmotionKey;
      subData[eachEmotionKey] = (
        todayTweets.overAllEmotions[eachEmotionKey] * 100
      ).toFixed(0);
      var colorKey = eachEmotionKey.toString() + "Color";
      subData[colorKey] = "hsl(42, 70%, 50%)";

      barChartData.push(subData);
    });
    setData(barChartData);
  };

  const setPieChart = () => {
    var overallData = [];
    Object.keys(todayTweets.topInfluencers)
      .slice(0, 5)
      .map((user) => {
        var subData = {};
        subData.id = user;
        subData.label = user;
        subData.value = (
          todayTweets.topInfluencers[user].favouriteCount /
          todayTweets.topInfluencers[user].tweetCount
        ).toFixed(2);
        overallData.push(subData);
      });
    setPieChartData(overallData);
  };

  useEffect(() => {
    setBarChartData();
    setPieChart();
    prepareRadarData();
  }, []);

  return (
    <div style={{ marginTop: -18 }}>
      <div className="title-header">
        <p className="light-title">Today's Report ( 7 July )</p>
      </div>

      <div className="content-wrapper">
        {/* row */}
        <div className="grid-container">
          <div className="grid-item">
            <div className="card">
              <div className="card-header">
                <p>Overall Sentiment Level</p>
              </div>
              <div className="card-content" style={{ paddingBottom: 0 }}>
                <div className="grid-container">
                  <div className="grid-item">
                    <ReactSpeedometer
                      width={250}
                      height={160}
                      needleHeightRatio={0.8}
                      value={finalScore * 200}
                      segmentColors={[
                        "#c0392b",
                        "#e74c3c",
                        "#f39c12",
                        "#f1c40f",
                        "#3498db",
                      ]}
                      currentValueText=""
                      customSegmentLabels={[
                        {
                          position: "INSIDE",
                          color: "#fff",
                        },
                        {
                          position: "INSIDE",
                          color: "#fff",
                        },
                        {
                          position: "INSIDE",
                          color: "#fff",
                        },
                        {
                          position: "INSIDE",
                          color: "#fff",
                        },
                        {
                          position: "INSIDE",
                          color: "#fff",
                        },
                      ]}
                      ringWidth={20}
                      needleTransitionDuration={3333}
                      needleTransition="easeElastic"
                      needleColor={"#2c3e50"}
                      textColor={"#fff"}
                    />
                  </div>
                  <div className="grid-item">
                    <div className="score" style={{ marginRight: 20 }}>
                      <p className="overall-score">
                        {finalLabel === "Positive" ? (
                          <FontAwesomeIcon icon={faSmile} className="icon" />
                        ) : finalLabel === "Negative" ? (
                          <FontAwesomeIcon icon={faSadTear} className="icon" />
                        ) : (
                          <FontAwesomeIcon icon={faMeh} className="icon" />
                        )}
                        {finalScore.toFixed(2)}
                      </p>
                      <p className="out-of-text">out of 5 </p>

                      <p
                        className="overall-sentiment"
                        style={{ color: finalLabelColor }}
                      >
                        {finalLabel}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card" style={{ marginTop: 10 }}>
              <div
                className="card-header"
                style={{ paddingTop: 15, paddingBottom: 15 }}
              >
                Today's Stats
              </div>
              <div
                className="card-content"
                style={{ paddingTop: 20, paddingBottom: 10 }}
              >
                <div className="grid-container">
                  <div className="grid-item">
                    <div className="small-title">
                      <FontAwesomeIcon icon={faRetweet} className="icon" />
                      No. Tweets
                    </div>
                    <div className="small-bold">
                      {todayTweets.totalTweetCount}
                    </div>
                  </div>
                  <div className="grid-item">
                    <div className="small-title">
                      <FontAwesomeIcon icon={faHashtag} className="icon" />
                      No. Hashtags
                    </div>
                    <div className="small-bold">
                      {Object.keys(todayTweets.hashtags).length}
                    </div>
                  </div>
                  <div className="grid-item">
                    <div className="small-title">
                      <FontAwesomeIcon icon={faUserAlt} className="icon" />
                      No. Users
                    </div>
                    <div className="small-bold">1300</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid-item">
            <div className="card">
              <div className="card-header">
                <p>Sentiment Breakdown</p>
              </div>
              <div className="card-content" style={{ height: 300 }}>
                <ResponsiveBar
                  data={data}
                  keys={["sadness", "anger", "joy", "fear", "disgust"]}
                  indexBy="id"
                  margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                  padding={0.3}
                  colors={{ scheme: "dark2" }}
                  defs={[
                    {
                      id: "dots",
                      type: "patternDots",
                      background: "inherit",
                      color: "#38bcb2",
                      size: 4,
                      padding: 1,
                      stagger: true,
                    },
                    {
                      id: "lines",
                      type: "patternLines",
                      background: "inherit",
                      color: "#eed312",
                      rotation: -45,
                      lineWidth: 6,
                      spacing: 10,
                    },
                  ]}
                  borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
                  axisTop={null}
                  axisRight={null}
                  axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "Emotions",
                    legendPosition: "middle",
                    legendOffset: 32,
                  }}
                  axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "Emotion Level",
                    legendPosition: "middle",
                    legendOffset: -40,
                  }}
                  labelSkipWidth={12}
                  labelSkipHeight={12}
                  labelTextColor={{
                    from: "color",
                    modifiers: [["darker", 1.6]],
                  }}
                  legends={[
                    {
                      dataFrom: "keys",
                      anchor: "bottom-right",
                      direction: "column",
                      justify: false,
                      translateX: 120,
                      translateY: 0,
                      itemsSpacing: 2,
                      itemWidth: 100,
                      itemHeight: 20,
                      itemDirection: "left-to-right",
                      itemOpacity: 0.85,
                      symbolSize: 20,
                      effects: [
                        {
                          on: "hover",
                          style: {
                            itemOpacity: 1,
                          },
                        },
                      ],
                    },
                  ]}
                  animate={true}
                  motionStiffness={90}
                  motionDamping={15}
                />
              </div>
            </div>
          </div>
        </div>
        {/* Map */}
        <div className="grid-container">
          <div className="grid-item" style={{ width: 900, marginTop: 30 }}>
            <div className="card">
              <div
                className="card-header"
                style={{ paddingTop: 15, paddingBottom: 15 }}
              >
                Choropleth Map ( Heat Map )
              </div>
              <div className="card-content">
                <HeatMap />
              </div>
            </div>
          </div>
          <div className="grid-item" style={{ marginTop: 30 }}>
            <div className="card">
              {/* <div
                className="card-header"
                style={{ paddingTop: 15, paddingBottom: 15 }}
              >
                helo
              </div> */}
              <div className="card-content">
                <p className="legend-text">
                  <span
                    className="color-box"
                    style={{ color: "#cccccc", backgroundColor: "#cccccc" }}
                  >
                    hh
                  </span>
                  No Negativity
                </p>
                <p className="legend-text">
                  <span
                    className="color-box"
                    style={{ color: "#be3d26", backgroundColor: "#be3d26" }}
                  >
                    hh
                  </span>
                  Less Negativity
                </p>
                <p className="legend-text">
                  <span
                    className="color-box"
                    style={{ color: "#9a301f", backgroundColor: "#9a301f" }}
                  >
                    hh
                  </span>
                  Moderate Negativity
                </p>
                <p className="legend-text">
                  <span
                    className="color-box"
                    style={{ color: "#772617", backgroundColor: "#772617" }}
                  >
                    hh
                  </span>
                  High Negativity
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Top Influencers */}
        <div
          className="grid-container"
          style={{ marginTop: 20, marginBottom: 20 }}
        >
          <div className="grid-item">
            <div className="card">
              <div className="card-header">
                <p>Top Influencers</p>
              </div>
              <div className="card-content" style={{ paddingTop: 20 }}>
                <table>
                  <tr>
                    <td>Username</td>
                    <td>No of Tweets</td>
                    <td>No of Likes</td>
                    <td>No of followers</td>
                  </tr>
                  {Object.keys(todayTweets.topInfluencers)
                    .slice(0, 7)
                    .map((row, index) => {
                      return (
                        <tr>
                          <td>{row}</td>
                          <td>{todayTweets.topInfluencers[row].tweetCount}</td>
                          <td>
                            {todayTweets.topInfluencers[row].favouriteCount}
                          </td>
                          <td>
                            {todayTweets.topInfluencers[row].followersCount}
                          </td>
                        </tr>
                      );
                    })}
                </table>
              </div>
            </div>
          </div>
          <div className="grid-item">
            <div className="card">
              <div
                className="card-header"
                style={{ paddingTop: 15, paddingBottom: 15 }}
              >
                Most Likely Ratio
              </div>
              <div className="card-content" style={{ height: 300 }}>
                <ResponsivePie
                  data={pieChartData}
                  margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                  innerRadius={0.5}
                  padAngle={0.7}
                  cornerRadius={3}
                  colors={{ scheme: "nivo" }}
                  borderWidth={1}
                  borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
                  radialLabelsSkipAngle={10}
                  radialLabelsTextXOffset={6}
                  radialLabelsTextColor="#333333"
                  radialLabelsLinkOffset={0}
                  radialLabelsLinkDiagonalLength={16}
                  radialLabelsLinkHorizontalLength={24}
                  radialLabelsLinkStrokeWidth={1}
                  radialLabelsLinkColor={{ from: "color" }}
                  slicesLabelsSkipAngle={10}
                  slicesLabelsTextColor="#333333"
                  animate={true}
                  motionStiffness={90}
                  motionDamping={15}
                  defs={[
                    {
                      id: "dots",
                      type: "patternDots",
                      background: "inherit",
                      color: "rgba(255, 255, 255, 0.3)",
                      size: 4,
                      padding: 1,
                      stagger: true,
                    },
                    {
                      id: "lines",
                      type: "patternLines",
                      background: "inherit",
                      color: "rgba(255, 255, 255, 0.3)",
                      rotation: -45,
                      lineWidth: 6,
                      spacing: 10,
                    },
                  ]}
                  fill={[
                    {
                      match: {
                        id: "ruby",
                      },
                      id: "dots",
                    },
                    {
                      match: {
                        id: "c",
                      },
                      id: "dots",
                    },
                    {
                      match: {
                        id: "go",
                      },
                      id: "dots",
                    },
                    {
                      match: {
                        id: "python",
                      },
                      id: "dots",
                    },
                    {
                      match: {
                        id: "scala",
                      },
                      id: "lines",
                    },
                    {
                      match: {
                        id: "lisp",
                      },
                      id: "lines",
                    },
                    {
                      match: {
                        id: "elixir",
                      },
                      id: "lines",
                    },
                    {
                      match: {
                        id: "javascript",
                      },
                      id: "lines",
                    },
                  ]}
                  legends={[
                    {
                      anchor: "bottom",
                      direction: "row",
                      translateY: 56,
                      itemWidth: 100,
                      itemHeight: 18,
                      itemTextColor: "#999",
                      symbolSize: 18,
                      symbolShape: "circle",
                      effects: [
                        {
                          on: "hover",
                          style: {
                            itemTextColor: "#000",
                          },
                        },
                      ],
                    },
                  ]}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Mentions and some tweets */}
        <div className="grid-container">
          <div className="grid-item">
            <div className="card">
              <div className="card-header">
                <p>Top Mentions</p>
              </div>
              <div className="card-content">
                <table>
                  <tr>
                    <td>Username</td>
                    <td>No of mentions</td>
                  </tr>
                  {Object.keys(todayTweets.mentions)
                    .slice(0, 5)
                    .map((row, index) => {
                      return (
                        <tr>
                          <td>{row}</td>
                          <td>{todayTweets.mentions[row]}</td>
                        </tr>
                      );
                    })}
                </table>
              </div>
            </div>
          </div>
          <div className="grid-item">
            <div className="card">
              <div className="card-header">
                <p>Recent Tweets</p>
              </div>
              <div className="card-content">
                <table>
                  <tr>
                    <td>Username</td>
                    <td>Tweet Text</td>
                    <td>Followers Count</td>
                    <td>Sentiment</td>
                  </tr>
                  {todayTweets.results["0-8"].slice(3, 8).map((row, index) => {
                    return (
                      <tr>
                        <td>{row.screenName}</td>
                        <td title={row.text}>
                          {row.text.substring(0, 20) + "..."}
                        </td>
                        <td>{row.followersCount}</td>
                        <td>
                          {row.prediction === "Positive" ? (
                            <FontAwesomeIcon
                              icon={faSmile}
                              style={{ color: "#229E76" }}
                            />
                          ) : row.prediction === "Negative" ? (
                            <FontAwesomeIcon
                              icon={faSadCry}
                              style={{ color: "#e74c3c" }}
                            />
                          ) : (
                            <FontAwesomeIcon
                              icon={faSmileWink}
                              style={{ color: "#f39c12" }}
                            />
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Radar chart */}
        <div
          className="grid-container"
          style={{ marginTop: 30, marginBottom: 30 }}
        >
          <div className="grid-item">
            <div className="card">
              <div className="card-header">
                <p>Comparison Between Time Intervals ( Radar Chart )</p>
              </div>
              <div className="card-content">
                <Radar data={radarData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodayReport;
