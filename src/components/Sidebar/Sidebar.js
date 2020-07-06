import React, { useState } from "react";

// stylesheet
import "./Sidebar.css";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faChartPie,
  faChartBar,
  faBell,
  faChevronRight,
  faThLarge,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  const [options, setOptions] = useState([
    {
      name: "Overview",
      iconName: faThLarge,
    },
    {
      name: "Today Report",
      iconName: faChartLine,
    },
    {
      name: "Metrics",
      iconName: faChartPie,
    },
    {
      name: "Graphs",
      iconName: faChartBar,
    },
    {
      name: "Notifications",
      iconName: faBell,
    },
  ]);
  return (
    <div className="sidebar">
      <div className="sidebar-content-wrapper">
        <div className="avatar"></div>
        <p className="username">Gowshik Prabhu</p>

        {/* Menu */}
        <div className="sidebar-menu">
          {options.map((option, index) => {
            return (
              <div className="menu-title" key={index}>
                <span className="menu-item">
                  <FontAwesomeIcon icon={option.iconName} className="icon" />
                  {option.name}
                  <FontAwesomeIcon icon={faChevronRight} className="chevron" />
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
