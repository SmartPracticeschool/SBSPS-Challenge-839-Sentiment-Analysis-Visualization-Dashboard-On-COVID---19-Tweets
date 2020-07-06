import React from "react";

import "./App.css";

import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Home from "./screens/Dashboard/Home";

const App = () => {
  return (
    <div>
      <Header />
      <Sidebar />
      <Home />
    </div>
  );
};

export default App;
