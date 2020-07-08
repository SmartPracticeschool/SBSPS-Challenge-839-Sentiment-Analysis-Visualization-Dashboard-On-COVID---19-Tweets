import React, { useState, useContext } from "react";

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
  faThLarge
} from "@fortawesome/free-solid-svg-icons";

// Context
import { Context } from "../../context/Context";

const Sidebar = () => {
  const { setSelectedComponent } = useContext(Context);
  const [options, setOptions] = useState([
    {
      name: "Overview",
      key: "Overview",
      iconName: faThLarge
    },
    {
      name: "Today Report",
      key: "TodayReport",
      iconName: faChartLine
    },
    {
      name: "History",
      key: "History",
      iconName: faChartPie
    },
    {
      name: "Graphs",
      iconName: faChartBar
    },
    {
      name: "Notifications",
      iconName: faBell
    }
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
              <div
                className="menu-title"
                key={index}
                onClick={() => setSelectedComponent(option.key)}
              >
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
