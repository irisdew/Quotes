import { dbService, storageService } from "fbase";
import React, { useState } from "react";
import { Textarea } from "@chakra-ui/react";
import styled from "styled-components";

const TweetFactory = ({ userObj }) => {
  const [tweet, setTweet] = useState("");
  const [attachment, setAttachment] = useState("");
  const [attachmentName, setAttachmentName] = useState("");

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
    <Form onSubmit={onSubmit}>
      <input value={tweet} onChange={onChange} type="textarea" placeholder="Whant's on your mind?" maxLength={120} />
      {/* <input type="file" accept="image/*" onChange={onFileChange} /> */}
      <input type="submit" value="Tweet" className="submit" />
      {attachment && (
        <div>
          <img alt="attachment" src={attachment} width="50px" height="50px" />
          <button onClick={onClearAttachement}>Clear</button>
        </div>
      )}
    </Form>
  );
};

export default TweetFactory;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  input {
    flex-grow: 1;
    height: 40px;
    padding: 0px 20px;
    color: white;
    border: 1px solid #04aaff;
    border-radius: 20px;
    font-weight: 500;
    font-size: 12px;
    outline: none;
  }

  .submit {
    position: absolute;
    right: 0;
    background-color: #04aaff;
    height: 40px;
    width: 40px;
    padding: 10px 0px;
    text-align: center;
    border-radius: 20px;
    color: white;
    color: #04aaff;
    cursor: pointer;
  }
`;
