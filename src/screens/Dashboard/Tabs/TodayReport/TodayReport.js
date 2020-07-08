import React, { useState } from "react";

// Stylesheet
import "./TodayReport.css";

// Speedometer
import ReactSpeedometer from "react-d3-speedometer";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSmileWink,
  faKiwiBird,
  faUserAlt,
  faHashtag,
  faRetweet,
} from "@fortawesome/free-solid-svg-icons";

// Charts
import { ResponsiveBar } from "@nivo/bar";

const TodayReport = () => {
  const [data, setData] = useState([
    {
      country: "AD",
      "hot dog": 104,
      "hot dogColor": "hsl(142, 70%, 50%)",
      burger: 193,
      burgerColor: "hsl(69, 70%, 50%)",
      sandwich: 64,
      sandwichColor: "hsl(236, 70%, 50%)",
      kebab: 134,
      kebabColor: "hsl(187, 70%, 50%)",
      fries: 109,
      friesColor: "hsl(312, 70%, 50%)",
      donut: 191,
      donutColor: "hsl(115, 70%, 50%)",
    },
    {
      country: "AE",
      "hot dog": 101,
      "hot dogColor": "hsl(146, 70%, 50%)",
      burger: 153,
      burgerColor: "hsl(346, 70%, 50%)",
      sandwich: 44,
      sandwichColor: "hsl(47, 70%, 50%)",
      kebab: 88,
      kebabColor: "hsl(78, 70%, 50%)",
      fries: 4,
      friesColor: "hsl(137, 70%, 50%)",
      donut: 156,
      donutColor: "hsl(137, 70%, 50%)",
    },
    {
      country: "AF",
      "hot dog": 121,
      "hot dogColor": "hsl(122, 70%, 50%)",
      burger: 82,
      burgerColor: "hsl(124, 70%, 50%)",
      sandwich: 122,
      sandwichColor: "hsl(251, 70%, 50%)",
      kebab: 166,
      kebabColor: "hsl(159, 70%, 50%)",
      fries: 157,
      friesColor: "hsl(208, 70%, 50%)",
      donut: 49,
      donutColor: "hsl(319, 70%, 50%)",
    },
    {
      country: "AG",
      "hot dog": 118,
      "hot dogColor": "hsl(266, 70%, 50%)",
      burger: 106,
      burgerColor: "hsl(226, 70%, 50%)",
      sandwich: 66,
      sandwichColor: "hsl(330, 70%, 50%)",
      kebab: 188,
      kebabColor: "hsl(249, 70%, 50%)",
      fries: 179,
      friesColor: "hsl(250, 70%, 50%)",
      donut: 21,
      donutColor: "hsl(130, 70%, 50%)",
    },
    {
      country: "AI",
      "hot dog": 199,
      "hot dogColor": "hsl(318, 70%, 50%)",
      burger: 193,
      burgerColor: "hsl(320, 70%, 50%)",
      sandwich: 182,
      sandwichColor: "hsl(277, 70%, 50%)",
      kebab: 62,
      kebabColor: "hsl(109, 70%, 50%)",
      fries: 5,
      friesColor: "hsl(114, 70%, 50%)",
      donut: 122,
      donutColor: "hsl(279, 70%, 50%)",
    },
  ]);
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
                      value={2 * 200}
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
                        <FontAwesomeIcon
                          icon={faSmileWink}
                          style={{ marginRight: 10 }}
                        />
                        4.5
                      </p>
                      <p className="out-of-text">out of 5 </p>

                      <p className="overall-sentiment">Positive</p>
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
                    <div className="small-bold">3000</div>
                  </div>
                  <div className="grid-item">
                    <div className="small-title">
                      <FontAwesomeIcon icon={faHashtag} className="icon" />
                      No. Hashtags
                    </div>
                    <div className="small-bold">3000</div>
                  </div>
                  <div className="grid-item">
                    <div className="small-title">
                      <FontAwesomeIcon icon={faUserAlt} className="icon" />
                      No. Users
                    </div>
                    <div className="small-bold">3000</div>
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
                  keys={[
                    "hot dog",
                    "burger",
                    "sandwich",
                    "kebab",
                    "fries",
                    "donut",
                  ]}
                  indexBy="country"
                  margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                  padding={0.3}
                  colors={{ scheme: "nivo" }}
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
                  fill={[
                    {
                      match: {
                        id: "fries",
                      },
                      id: "dots",
                    },
                    {
                      match: {
                        id: "sandwich",
                      },
                      id: "lines",
                    },
                  ]}
                  borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
                  axisTop={null}
                  axisRight={null}
                  axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "country",
                    legendPosition: "middle",
                    legendOffset: 32,
                  }}
                  axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "food",
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
      </div>
    </div>
  );
};

export default TodayReport;
