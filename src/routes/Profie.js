import { authService } from "fbase";
import React from "react";

const Profie = () => {
  const onLogOutClick = () => authService.signOut();
  return (
    <div>
      <button onClick={onLogOutClick}>Logout</button>
      <span>Profile</span>
    </div>
  );
};

export default Profie;
