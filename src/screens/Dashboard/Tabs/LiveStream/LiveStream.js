import React, { useState, useEffect } from "react";

import "./LiveStream.css";

import RealTimeChart from "./components/RealTimeGraph";

import io from "socket.io-client";

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
  faCircle
} from "@fortawesome/free-solid-svg-icons";

// const ENDPOINT = "http://127.0.0.1:5000/liveStream";
// const socket = io(ENDPOINT);

// // Socket listeners
// socket.on("connect", () => {
//   socket.send("User connected");
// });
const LiveStream = () => {
  const [liveStreamData, setLiveStreamData] = useState([]);
  const [recentData, setRecentData] = useState({});
  useEffect(() => {
    // socket.on("message", data => {
    //   setLiveStreamData(liveStreamData => [...liveStreamData, data]);
    //   console.log(data);
    //   setRecentData(data);
    // });
  }, []);

  return (
    <div className="main-container">
      <div className="grid-container">
        <div className="grid-item">
          <div className="card">
            <div
              className="card-header"
              style={{ paddingTop: 15, paddingBottom: 15 }}
            >
              Live Stream
              <FontAwesomeIcon
                icon={faCircle}
                className="Blink"
                style={{ color: "#27ae60", marginLeft: 10 }}
              />
            </div>
            <div className="card-content" style={{ height: 300 }}>
              <RealTimeChart data={recentData} />
            </div>
          </div>
        </div>
      </div>

      {/* Other content */}
      <div className="card" style={{ marginTop: 20 }}>
        <div
          className="card-header"
          style={{ paddingTop: 15, paddingBottom: 15 }}
        >
          Recent Tweets
        </div>
        <div className="card-content">
          <table>
            <tr>
              <td>UserName</td>
              <td>Tweet Text</td>
              <td>Sentiment</td>
            </tr>
            {liveStreamData.slice(0, 5).map((tweet, index) => {
              return (
                <tr key={index}>
                  <td>{tweet.screenName}</td>
                  <td title={tweet.text}>
                    {tweet.text.substring(0, 20) + "..."}
                  </td>
                  <td>
                    {tweet.prediction === "Positive" ? (
                      <FontAwesomeIcon
                        icon={faSmile}
                        style={{ color: "#229E76" }}
                      />
                    ) : tweet.prediction === "Negative" ? (
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
  );
};
export default LiveStream;
