import React from "react";
import styled from "styled-components";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { authService, firebaseInstance } from "fbase";

const SocialAuth = () => {
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    const data = authService.signInWithPopup(provider);
    console.log(data);
  };
  return (
    <AuthBtns>
      <Button name="google" onClick={onSocialClick}>
        <FaGoogle /> Continue with Google
      </Button>
      <Button name="github" onClick={onSocialClick}>
        <FaGithub /> Continue with Github
      </Button>
    </AuthBtns>
  );
};

export default SocialAuth;

const AuthBtns = styled.div`
  display: flex;
  justify-content: space-between;
  width: 93%;
`;

const Button = styled.button`
  cursor: pointer;
  border-radius: 20px;
  border: none;
  padding: 10px 0px;
  font-size: 11.5px;
  text-align: center;
  width: 150px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
`;
