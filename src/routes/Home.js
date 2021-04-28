import Tweet from "components/Tweet";
import { dbService, storageService } from "fbase";
import React, { useState, useEffect } from "react";

const Home = ({ userObj }) => {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);
  const [attachment, setAttachment] = useState("");
  const [attachmentName, setAttachmentName] = useState("");
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
  const onSubmit = async (event) => {
    event.preventDefault();
    let attachmentUrl = "";
    if (attachment !== "") {
      const attachmentRef = storageService.ref().child(`${userObj.uid}/${attachmentName}`);
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    }
    const newTweet = {
      text: tweet,
      createdAt: Date.now(),
      authorId: userObj.uid,
      attachmentUrl,
    };
    await dbService.collection("tweets").add(newTweet);
    setTweet("");
    setAttachment("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setTweet(value);
  };
  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    setAttachmentName(theFile.name);
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };
  const onClearAttachement = () => setAttachment("");
  return (
    <div>
      <span>Home</span>
      <form onSubmit={onSubmit}>
        <input value={tweet} onChange={onChange} type="text" placeholder="Whant's on your mind?" maxLength={120} />
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="Tweet" />
        {attachment && (
          <div>
            <img alt="attachment" src={attachment} width="50px" height="50px" />
            <button onClick={onClearAttachement}>Clear</button>
          </div>
        )}
      </form>
      <div>
        {tweets.map((tweet) => (
          <Tweet key={tweet.id} tweetObj={tweet} isAuthor={tweet.authorId === userObj.uid} />
        ))}
      </div>
    </div>
  );
};

export default Home;
