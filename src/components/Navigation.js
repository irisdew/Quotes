import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaComment, FaBook, FaUserCircle } from "react-icons/fa";

const Navigation = ({ userObj }) => {
  console.log("!!!".userObj);

  return (
    <Nav>
      <UserInfo>
        <Avatar alt="profile" src="/kiri.jpg" />
        <h3>{userObj?.displayName}</h3>
        {/* <p>Pro Member</p>
      <Link to="/profile">
        <p>Edit Profile</p>
        <button>Logout</button>
      </Link> */}
      </UserInfo>
      <Menu>
        <Link to="/">
          <FaComment />
        </Link>
        <Link to="/">
          <FaBook />
        </Link>
        <Link to="/profile">
          <FaUserCircle />
        </Link>
      </Menu>
    </Nav>
  );
};
export default Navigation;

const Nav = styled.nav`
  /* flex: 1; */
  display: flex;
  flex-direction: column;
  align-items: center;
  /* border-right: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2); */
  /* box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05); */
  border-radius: 2rem;
  text-align: center;

  h3 h2 p {
    color: #426696;
  }
`;

const UserInfo = styled.div`
  margin-top: 30px;
`;

const Avatar = styled.img`
  vertical-align: middle;
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;

const Menu = styled.div`
  display: flex;
  a {
    text-decoration: none;
    color: #426696;
    font-size: 1rem;
    margin: 0.2rem;
  }
`;
