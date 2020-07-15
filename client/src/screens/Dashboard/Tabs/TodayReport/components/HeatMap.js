import React, { useState, useEffect, useContext } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleQuantile } from "d3-scale";
import ReactTooltip from "react-tooltip";

import { Context } from "../../../../../context/Context.js";

import { getCoordinates } from "../../../../../actions/actions";

const INDIA_TOPO_JSON = require("./india.topo.json");

const PROJECTION_CONFIG = {
  scale: 350,
  center: [78.9629, 22.5937], // always in [East Latitude, North Longitude]
};

// Red Variants
const COLOR_RANGE = [
  "#ffedea",
  "#ffcec5",
  "#ffad9f",
  "#ff8a75",
  "#ff5533",
  "#cccccc",
  "#be3d26",
  "#9a311f",
  "#782618",
];

const DEFAULT_COLOR = "red";

const geographyStyle = {
  default: {
    outline: "none",
  },
  hover: {
    fill: "#ccc",
    transition: "all 250ms",
    outline: "none",
  },
  pressed: {
    outline: "none",
  },
};

// will generate random heatmap data on every call
const getHeatMapData = () => {
  return [];
};

const HeatMap = () => {
  const [tooltipContent, setTooltipContent] = useState("");
  const [data, setData] = useState(getHeatMapData());
  const { todayTweets } = useContext(Context);
  const [states, setStates] = useState({});
  const [mainData, setMainData] = useState([
    { id: "AP", state: "Andhra Pradesh", positive: 0, negative: 0 },
    {
      id: "AR",
      state: "Arunachal Pradesh",
      positive: 0,
      negative: 0,
    },
    { id: "AS", state: "Assam", positive: 0, negative: 0 },
    { id: "BR", state: "Bihar", positive: 0, negative: 0 },
    { id: "CT", state: "Chhattisgarh", positive: 0, negative: 0 },
    { id: "GA", state: "Goa", positive: 0, negative: 0 },
    { id: "GJ", state: "Gujarat", positive: 0, negative: 0 },
    { id: "HR", state: "Haryana", positive: 0, negative: 0 },
    {
      id: "HP",
      state: "Himachal Pradesh",
      positive: 0,
      negative: 0,
    },
    { id: "JH", state: "Jharkhand", positive: 0, negative: 0 },
    { id: "KA", state: "Karnataka", positive: 0, negative: 0 },
    { id: "KL", state: "Kerala", positive: 0, negative: 0 },
    { id: "MP", state: "Madhya Pradesh", positive: 0, negative: 0 },
    { id: "MH", state: "Maharashtra", positive: 0, negative: 0 },
    { id: "MN", state: "Manipur", positive: 0, negative: 0 },
    { id: "ML", state: "Meghalaya", positive: 0, negative: 0 },
    { id: "MZ", state: "Mizoram", positive: 0, negative: 0 },
    { id: "NL", state: "Nagaland", positive: 0, negative: 0 },
    { id: "OR", state: "Odisha", positive: 0, negative: 0 },
    { id: "PB", state: "Punjab", positive: 0, negative: 0 },
    { id: "RJ", state: "Rajasthan", positive: 0, negative: 0 },
    { id: "SK", state: "Sikkim", positive: 0, negative: 0 },
    { id: "TN", state: "Tamil Nadu", positive: 0, negative: 0 },
    { id: "TG", state: "Telangana", positive: 0, negative: 0 },
    { id: "TR", state: "Tripura", positive: 0, negative: 0 },
    { id: "UT", state: "Uttarakhand", positive: 0, negative: 0 },
    { id: "UP", state: "Uttar Pradesh", positive: 0, negative: 0 },
    { id: "WB", state: "West Bengal", positive: 0, negative: 0 },
    {
      id: "AN",
      state: "Andaman and Nicobar Islands",
      positive: 0,
      negative: 0,
    },
    { id: "CH", state: "Chandigarh", positive: 0, negative: 0 },
    {
      id: "DN",
      state: "Dadra and Nagar Haveli",
      positive: 0,
      negative: 0,
    },
    { id: "DD", state: "Daman and Diu", positive: 0, negative: 0 },
    { id: "DL", state: "Delhi", positive: 0, negative: 0 },
    {
      id: "JK",
      state: "Jammu and Kashmir",
      positive: 0,
      negative: 0,
    },
    { id: "LA", state: "Ladakh", positive: 0, negative: 0 },
    { id: "LD", state: "Lakshadweep", positive: 0, negative: 0 },
    { id: "PY", state: "Puducherry", positive: 0, negative: 0 },
  ]);

  const colorScale = scaleQuantile()
    .domain(mainData.map((d) => d.positive))
    .range(COLOR_RANGE);

  const onMouseEnter = (geo, current = { value: "NA" }) => {
    return () => {
      setTooltipContent(
        `${geo.properties.name}: Positive - ${current.positive}, Negative - ${current.negative}`
      );
    };
  };

  const onMouseLeave = () => {
    setTooltipContent("");
  };

  const getStatesName = () => {
    Object.keys(todayTweets.locations).map((location) => {
      getCoordinates(location).then((res) => {
        if (res.status === 200 && res.data.state !== undefined) {
          var tempState = states;
          if (tempState.hasOwnProperty(res.data.state)) {
            tempState[res.data.state].positive += parseInt(
              todayTweets.locations[location].positive
            );
            tempState[res.data.state].negative += parseInt(
              todayTweets.locations[location].negative
            );
          } else {
            tempState[res.data.state] = {
              positive: todayTweets.locations[location].positive,
              negative: todayTweets.locations[location].negative,
            };
          }
          var tempMainData = mainData;
          for (var i = 0; i < tempMainData.length; i++) {
            var subData = tempMainData[i];
            if (subData.state === res.data.state) {
              subData.positive = tempState[res.data.state].positive;
              subData.negative = tempState[res.data.state].negative;
            }
          }
          setMainData(tempMainData);
          setStates(tempState);
        }
      });
    });
  };

  useEffect(() => {
    getStatesName();
  }, []);
  return (
    <div className="full-width-height container">
      <ReactTooltip>{tooltipContent}</ReactTooltip>
      <ComposableMap
        projectionConfig={PROJECTION_CONFIG}
        projection="geoMercator"
        width={600}
        height={220}
        data-tip=""
      >
        <Geographies geography={INDIA_TOPO_JSON}>
          {({ geographies }) =>
            geographies.map((geo) => {
              //console.log(geo.id);
              var current = mainData.find((s) => s.id === geo.id);
              if (current !== undefined) {
                var sentimentCount = {
                  positive: current.positive,
                  negative: current.negative,
                };
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={
                      current ? colorScale(current.negative) : DEFAULT_COLOR
                    }
                    style={geographyStyle}
                    onMouseEnter={onMouseEnter(geo, sentimentCount)}
                    onMouseLeave={onMouseLeave}
                  />
                );
              }
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
};

export default HeatMap;
