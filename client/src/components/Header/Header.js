import React from "react";

// Stylesheet
import "./Header.css";

// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    <div className="header">
      <div className="header-content-wrapper">
        <button className="hamburger-btn">
          <FontAwesomeIcon icon={faBars} />
        </button>
        <span className="faded-text">Tweezy - Live Sentiment Analyzer</span>
      </div>
    </div>
  );
};
export default Header;
