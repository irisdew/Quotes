import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AppRouter from "components/Router";
import { authService } from "fbase";
import GlobalStyle from "components/GlobalStyle";
import CircularProgress from "@material-ui/core/CircularProgress";

function App() {
  const [init, setInit] = useState(false); //Firebase가 실행시작되었는지 알려줌
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser); // 현재 유저, 현재 유저가 없으면 null
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    // onAuthStateChanged : 현재 유저를 가져올 때, Auth 개체가 변경되었는지 관찰하는 Observer
    authService.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in
        setIsLoggedIn(true);
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args), //
        });
      } else {
        // No user is signed in
        setIsLoggedIn(false);
      }
      setInit(true); //Firebase가 실행되었고 현재 유저 상태를 가져옴
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
    <>
      <GlobalStyle />
      {init ? (
        <Main>
          <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} refreshUser={refreshUser} />
        </Main>
      ) : (
        <>
          <CircularProgress size={20} />
          Initializing...
        </>
      )}
      <Footer>&copy; Quotes {new Date().getFullYear()}</Footer>
    </>
  );
}

export default App;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  justify-content: center;
`;

const Main = styled.div`
  width: 70vw;
  height: 80vh;
  display: flex;
  flex-direction: column;
  /* isLoggedIn = True 일때 */
  /* background: linear-gradient(to right bottom, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.3));
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  border-radius: 2rem; */
`;

const Footer = styled.footer`
  position: absolute;
  bottom: 15px;
`;

const Circle = styled.div`
  width: 20px;
  height: 20px;
  color: darkblue;
  margin-right: 10px;
`;
