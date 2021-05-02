import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AppRouter from "components/Router";
import { authService } from "fbase";
import GlobalStyle from "components/GlobalStyle";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
  };
  return (
    <Container>
      <GlobalStyle />
      {init ? (
        <Main>
          <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} refreshUser={refreshUser} />
        </Main>
      ) : (
        "Initializing..."
      )}
      <Footer>&copy; Quotes {new Date().getFullYear()}</Footer>
    </Container>
  );
}

export default App;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Main = styled.div`
  width: 70vw;
  height: 80vh;
  display: flex;
  background: linear-gradient(to right bottom, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.3));
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  border-radius: 2rem;
`;

const Footer = styled.footer`
  position: absolute;
  bottom: 15px;
`;
