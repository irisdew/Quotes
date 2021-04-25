import React from "react";

const Tweet = ({ tweetObj, isAuthor }) => {
  return (
    <div>
      <h4>{tweetObj.text}</h4>
      {isAuthor && (
        <>
          <button>Delete</button>
          <button>Edit</button>
        </>
      )}
    </div>
  );
};

export default Tweet;
