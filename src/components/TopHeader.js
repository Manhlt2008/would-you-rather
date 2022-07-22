import React, { Component, useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { Image } from "react-bootstrap";
import setAuthedUsers from "../actions/authedUser";
import "../styles/PageStyle.scss";
import { useHistory } from "react-router-dom";
const TopHeader = ({ authUsername, authUserAvatar }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const handleLogout = () => {
    dispatch(setAuthedUsers(null));
    history.push({
      pathname: "/login",
      state: { urlPrevious: "/" },
    });
  };
  return (
    <div className="ctn-top-header">
      <div className="menu">
        <div className="menu-item">
          <Link to="/">Home</Link>
        </div>
        <div className="menu-item">
          <Link to="/add">New Question</Link>
        </div>
        <div className="menu-item">
          <Link to="/leaderboard">Leader Board</Link>
        </div>
      </div>

      <button className="button-logout menu-item" onClick={() => handleLogout()}>
        {authUsername ? "Logout" : "Login"}
      </button>
      {authUserAvatar && (
        <div className="user-info">
          <strong>Welcome,</strong> {authUsername}
          <Image src={authUserAvatar} circle="true" className="avatar" />
        </div>
      )}
    </div>
  );
};

function mapStateToProps({ authedUser, users }) {
  let authUsername = null;
  let authUserAvatar = null;

  if (authedUser !== null) {
    authUsername = users[authedUser].name;
    authUserAvatar = users[authedUser].avatarURL;
  }

  return {
    authUserAvatar,
    authUsername,
  };
}
export default connect(mapStateToProps)(TopHeader);
