import React, { useEffect, useContext } from "react";

import "./Home.css";

// Loader
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

// Tabs
import { Overview } from "./Tabs";

// actions
import { getThisMonthTweets } from "./../../actions/actions";

// Context
import { Context } from "../../context/Context";

const Home = () => {
  const { thisMonthTweets, setThisMonthTweets } = useContext(Context);

  useEffect(() => {
    getThisMonthTweets("2020-06-05").then((res) => {
      setThisMonthTweets(res.data);
    });
  }, []);

  if (thisMonthTweets.weeklyData !== undefined) {
    return (
      <div className="main">
        <Overview />
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
