import { authService, dbService } from "fbase";
import React, { useState, useEffect } from "react";

// 로그아웃 버튼, 내 프로필 보기(사진, 설명), 내가 쓴 트윗 보기

const Profie = ({ userObj, refreshUser }) => {
  const onLogOutClick = () => authService.signOut();
  const getMyTweets = async () => {
    const tweets = await dbService.collection("tweets").where("authorId", "==", userObj.uid).orderBy("createdAt").get();
    console.log(tweets.docs.map((doc) => doc.data()));
  };
  useEffect(() => {
    getMyTweets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [userName, setUserName] = useState(userObj.displayName);
  const onChange = (event) => {
    setUserName(event.target.value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== userName) {
      await userObj.updateProfile({
        displayName: userName,
      });
      refreshUser();
    }
  };
  return (
    <div>
      <button onClick={onLogOutClick}>Logout</button>
      <br></br>
      <h2>Profile</h2>
      <span>User Name : {userName}</span>
      <br />
      <span>Quoting since 2021</span>
      <br />
      <button>Edit</button>
      <form onSubmit={onSubmit}>
        <h2>Edit Profile</h2>
        User Name : <input type="text" value={userName} onChange={onChange} />
        <br />
        User Image : <input type="file" accept="image/*" />
        <br />
        <input type="submit" value="Update Profile" />
      </form>
    </div>
  );
};

export default Profie;
