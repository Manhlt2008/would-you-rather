import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Image } from "react-bootstrap";
import setAuthedUsers from "../actions/authedUser";
import "../styles/PageStyle.scss";

class TopHeader extends Component {
  state = {
    user: true,
  };

  handleLogout = () => {
    const { dispatch } = this.props;
    dispatch(setAuthedUsers(null));
  };
  render() {
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
        
        <button className="button-logout menu-item" onClick={() => this.handleLogout()}>
          {this.props.authUsername ? "Logout" : "Login"}
        </button>
        {this.props.authUserAvatar && (
          <div className="user-info">
            <strong>Welcome,</strong> {this.props.authUsername}
            <Image src={this.props.authUserAvatar} circle="true" className="avatar" />
          </div>
        )}
      </div>
    );
  }
}

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
