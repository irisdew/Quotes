import React from "react";
import styled from "styled-components";
import AuthForm from "components/AuthForm";
import SocialAuth from "components/SocialAuth";
import { ReactComponent as LogoIcon } from "quotesLogo.svg";

const Auth = () => {
  return (
    <Container>
      <LogoIcon />
      <AuthForm />
      <SocialAuth />
    </Container>
  );
};

export default Auth;

const Container = styled.section`
  width: 400px;
  min-width: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: auto;
  padding: 30px;
`;
