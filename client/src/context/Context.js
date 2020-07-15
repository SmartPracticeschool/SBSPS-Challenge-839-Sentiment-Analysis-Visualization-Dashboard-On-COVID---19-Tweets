import React, { useState, createContext, useEffect } from "react";

export const Context = createContext();

const ContextProvider = props => {
  const [thisMonthTweets, setThisMonthTweets] = useState([]);
  const [todayTweets, setTodayTweets] = useState({});
  const [selectedComponent, setSelectedComponent] = useState("LiveStream");
  const [hashtags, setHashtags] = useState([]);
  const [monthlyTweetsEmotions, setMonthlyTweetsEmotions] = useState([]);
  const [thisMonthTweetsCollection, setThisMonthTweetsCollection] = useState(
    []
  );

  return (
    <Context.Provider
      value={{
        thisMonthTweets,
        setThisMonthTweets,
        thisMonthTweetsCollection,
        setThisMonthTweetsCollection,
        todayTweets,
        setTodayTweets,
        selectedComponent,
        setSelectedComponent,
        hashtags,
        setHashtags,
        monthlyTweetsEmotions,
        setMonthlyTweetsEmotions
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
