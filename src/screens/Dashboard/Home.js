import React, { useEffect, useContext } from "react";

import "./Home.css";

// Loader
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

// Tabs
import { Overview, TodayReport } from "./Tabs";

// actions
import {
  getThisMonthTweets,
  getTweetsByMonth,
  getTodayTweets,
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
  } = useContext(Context);

  useEffect(() => {
    getThisMonthTweets("2020-06-05").then((res) => {
      setThisMonthTweets(res.data);
    });

    getTweetsByMonth("2020-06-05").then((res) => {
      setThisMonthTweetsCollection(res.data);
    });

    getTodayTweets("2020-06-05").then((res) => {
      setTodayTweets(res.data);
    });
  }, []);

  if (
    thisMonthTweets.weeklyData !== undefined &&
    todayTweets.results !== undefined
  ) {
    return (
      <div className="main">
        {/* <Overview /> */}
        <TodayReport />
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
