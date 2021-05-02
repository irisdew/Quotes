import { authService } from "fbase";
import React, { useState } from "react";
import styled from "styled-components";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      if (newAccount) {
        data = await authService.createUserWithEmailAndPassword(email, password);
      } else {
        data = await authService.signInWithEmailAndPassword(email, password);
      }
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };
  const toggleAccount = () => setNewAccount((prev) => !prev);

  return (
    <Container onSubmit={onSubmit}>
      <AuthInput name="email" type="text" placeholder="Email" required value={email} onChange={onChange} />
      <AuthInput name="password" type="password" placeholder="Password" required value={password} onChange={onChange} />
      <AuthSubmit type="submit" value={newAccount ? "Create Account" : "Log In"} />
      {error}
      <span onClick={toggleAccount} style={{ fontWeight: 600, cursor: "pointer", textDecoration: "underline" }}>
        {newAccount ? "Sign in" : "Create Account"}
      </span>
    </Container>
  );
};

export default AuthForm;

const Container = styled.form`
  position: relative;
  width: 400px;
  max-width: 400px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 40px;
`;

const AuthInput = styled.input`
  width: 100%;
  margin-top: 20px;
  padding: 10px 20px;
  border: none;
  border-radius: 35px;
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.4);
  font-size: 16px;
  letter-spacing: 1px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
`;

const AuthSubmit = styled(AuthInput)`
  background: #04aaff;
  color: white;
  margin: 20px 0;
  font-weight: 600;
  border-bottom: none;
  border-radius: 30px;
  cursor: pointer;
  text-align: center;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0px 10px 10px -7px #c4c4c4;
  }
`;
