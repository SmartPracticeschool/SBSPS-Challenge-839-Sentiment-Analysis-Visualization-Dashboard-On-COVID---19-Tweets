import React, { useEffect, useContext } from "react";

import "./Home.css";

// Loader
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

// Tabs
import { Overview, TodayReport, History, LiveStream } from "./Tabs";

// actions
import {
  getThisMonthTweets,
  getTweetsByMonth,
  getTodayTweets
} from "./../../actions/actions";

// Context
import { Context } from "../../context/Context";

const Home = () => {
  const {
    thisMonthTweets,
    setThisMonthTweets,
    setThisMonthTweetsCollection,
    setTodayTweets,
    todayTweets,
    selectedComponent
  } = useContext(Context);

  useEffect(() => {
    getThisMonthTweets("2020-06-05").then(res => {
      setThisMonthTweets(res.data);
    });

    getTweetsByMonth("2020-06-05").then(res => {
      setThisMonthTweetsCollection(res.data);
    });

    getTodayTweets("2020-06-08").then(res => {
      console.log(res.data);
      setTodayTweets(res.data);
    });
  }, []);

  // Components mapping
  var mapping = {
    TodayReport: TodayReport,
    Overview: Overview,
    History: History,
    LiveStream: LiveStream
  };

  var Component = mapping[selectedComponent];
  if (
    thisMonthTweets.weeklyData !== undefined &&
    todayTweets.results !== undefined
  ) {
    return (
      <div className="main">
        {/* <Overview /> */}
        {/* <TodayReport /> */}
        <Component />
      </div>
    );
  } else {
    return (
      <div className="backdrop">
        <div className="backdrop-loader">
          <ClimbingBoxLoader state={true} size={15} color={"#008aff"} />
          <center>
            {" "}
            <p style={{ color: "#008aff" }}>Loading...Please Wait</p>
          </center>
        </div>
      </div>
    );
  }
};
export default Home;
