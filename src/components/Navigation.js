import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Avatar } from "@chakra-ui/react";

const Navigation = ({ userObj }) => (
  <Nav>
    <Avatar size="xl" name="Christian Nwamba" src="https://bit.ly/code-beast" />{" "}
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/profile">{userObj?.displayName}'s Profile</Link>
      </li>
    </ul>
  </Nav>
);
export default Navigation;

const Nav = styled.nav`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  border-radius: 2rem;

  ul {
    list-style: none;
  }
`;
