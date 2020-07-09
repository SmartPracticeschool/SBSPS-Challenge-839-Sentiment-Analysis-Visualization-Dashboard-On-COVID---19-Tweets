import React, { useContext, useEffect, useState } from "react";

import "./Modal.css";
import { Context } from "../../../../../context/Context";
import { updateHashtags } from "../../../../../actions/actions";

const HashtagsModal = ({ isOpen, handleClose }) => {
  const { todayTweets, hashtags } = useContext(Context);
  const [tempHashtags, setTempHastags] = useState([]);

  useEffect(() => {
    setTempHastags(hashtags);
  }, []);

  const addHashtag = text => {
    setTempHastags(tempHashtags => [...tempHashtags, text]);
  };
  if (isOpen) {
    return (
      <div>
        <div id="myModal" class="modal">
          <div class="modal-content">
            <span class="close" onClick={handleClose}>
              &times;
            </span>

            <div className="modal-content-container">
              <p className="modal-title">Hashtags To be Explored</p>
              {tempHashtags.map((hashtag, index) => {
                return (
                  <span key={index} style={{ marginRight: 20 }}>
                    {hashtag}
                  </span>
                );
              })}
              <br />

              <button
                onClick={() => {
                  updateHashtags(tempHashtags);
                  handleClose();
                }}
                className="update-btn"
              >
                Update
              </button>
              <hr />

              <p className="modal-title">Trending Hashtags</p>
              {Object.keys(todayTweets.hashtags).map((hashtag, index) => {
                return (
                  <span
                    className="span-text"
                    key={index}
                    style={{ cursor: "pointer" }}
                    onClick={() => addHashtag(hashtag)}
                  >
                    {hashtag + " - " + todayTweets.hashtags[hashtag]}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};
export default HashtagsModal;
