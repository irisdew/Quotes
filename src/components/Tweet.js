import { dbService } from "fbase";
import React from "react";

const Tweet = ({ tweetObj, isAuthor }) => {
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this tweet?");
    if (ok) {
      await dbService.doc(`tweets/${tweetObj.id}`).delete();
    }
  };
  return (
    <div>
      <h4>{tweetObj.text}</h4>
      {isAuthor && (
        <>
          <button onClick={onDeleteClick}>Delete</button>
          <button>Edit</button>
        </>
      )}
    </div>
  );
};

export default Tweet;
