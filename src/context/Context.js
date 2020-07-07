import React, { useState, createContext, useEffect } from "react";

export const Context = createContext();

const ContextProvider = (props) => {
  const [thisMonthTweets, setThisMonthTweets] = useState([]);

  return (
    <Context.Provider
      value={{
        thisMonthTweets,
        setThisMonthTweets,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
