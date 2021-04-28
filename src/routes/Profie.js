import { authService, dbService } from "fbase";
import React, { useEffect } from "react";

// 로그아웃 버튼, 내 프로필 보기(사진, 설명), 내가 쓴 트윗 보기

const Profie = ({ userObj }) => {
  const onLogOutClick = () => authService.signOut();
  const getMyTweets = async () => {
    const tweets = await dbService.collection("tweets").where("authorId", "==", userObj.uid).orderBy("createdAt").get();
    console.log(tweets.docs.map((doc) => doc.data()));
  };
  useEffect(() => {
    getMyTweets();
  }, []);
  return (
    <div>
      <button onClick={onLogOutClick}>Logout</button>
      <span>Profile</span>
    </div>
  );
};

export default Profie;
