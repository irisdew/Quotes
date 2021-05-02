import Tweet from "components/Tweet";
import TweetFactory from "components/TweetFactory";
import { dbService } from "fbase";
import React, { useState, useEffect } from "react";

const Home = ({ userObj }) => {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    // snapshot gives you update when changes happened in realtime
    dbService.collection("tweets").onSnapshot((snapshot) => {
      const tweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(tweetArray);
      setTweets(tweetArray);
    });
  }, []);

  return (
    <div>
      <span>Home</span>
      <TweetFactory userObj={userObj} />
      <div>
        {tweets.map((tweet) => (
          <Tweet key={tweet.id} tweetObj={tweet} isAuthor={tweet.authorId === userObj.uid} />
        ))}
      </div>
    </div>
  );
};

export default Home;
