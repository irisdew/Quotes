import React from "react";

const Tweet = ({ tweetObj }) => {
  return (
    <div>
      <h4>{tweetObj.text}</h4>
    </div>
  );
};

export default Tweet;
