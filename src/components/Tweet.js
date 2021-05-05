import { dbService, storageService } from "fbase";
import React, { useState } from "react";
import styled from "styled-components";

const Tweet = ({ tweetObj, isAuthor }) => {
  const [editing, setEditing] = useState(false);
  const [newTweet, setNewTweet] = useState(tweetObj.text);

  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this tweet?");
    if (ok) {
      await dbService.doc(`tweets/${tweetObj.id}`).delete();
      await storageService.refFromURL(tweetObj.attachmentUrl).delete();
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewTweet(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    console.log(tweetObj.text, "->", newTweet);
    await dbService.doc(`tweets/${tweetObj.id}`).update({ text: newTweet });
    setEditing(false);
  };

  return (
    <Container>
      {editing ? (
        <div>
          <form onSubmit={onSubmit}>
            <input type="text" value={newTweet} required onChange={onChange} />
            <input type="submit" value="Update Tweet" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </div>
      ) : (
        <div>
          <h4>{tweetObj.text}</h4>
          {tweetObj.attachmentUrl && <img alt="attachment" src={tweetObj.attachmentUrl} width="50px" height="50px" />}
          {isAuthor && (
            <>
              <button onClick={onDeleteClick}>Delete</button>
              <button onClick={toggleEditing}>Edit</button>
            </>
          )}
        </div>
      )}
    </Container>
  );
};

export default Tweet;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  background: linear-gradient(to left top, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.5));
  margin: 2rem 0rem;
  padding: 2rem;
  box-shadow: 6px 6px 20px rgba(122, 122, 122, 0.212);
  /* border: 0.1px solid black; */
  border-radius: 1rem;
  width: 500px;
`;
