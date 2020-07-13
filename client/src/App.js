import React, { useContext, useEffect } from "react";

import "./App.css";

import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Home from "./screens/Dashboard/Home";

//Global state Provider
import ContextProvider from "./context/Context";

const App = () => {
  return (
    <ContextProvider>
      <div>
        <Header />
        <Sidebar />
        <Home />
      </div>
    </ContextProvider>
  );
};

export default App;
