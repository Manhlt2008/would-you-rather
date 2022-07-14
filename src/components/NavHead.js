import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Image } from "react-bootstrap";
import setAuthedUsers from "../actions/authedUser";

class NavHead extends Component {
  state = {
    user: true,
  };

  handleLogout = () => {
    const { dispatch } = this.props;
    dispatch(setAuthedUsers(null));
  };
  render() {
    return (
      <div>
        <Navbar bg="dark" expand="lg">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="nav-preview">
              <Link className="d-inline p-2 bg-dark text-white" to="/">
                Home
              </Link>
              <Link className="d-inline p-2 bg-dark text-white" to="/add">
                New Question
              </Link>
              <Link className="d-inline p-2 bg-dark text-white" to="/leaderboard">
                Leaderboard
              </Link>
            </Nav>

            <button className="button-preview" onClick={() => this.handleLogout()}>
              {this.props.authUsername ? "Logout" : "Login"}
            </button>
            {this.props.authUserAvatar && (
              <Nav disabled className="nav-right">
                <strong>Welcome,</strong> {this.props.authUsername}
                <Image src={this.props.authUserAvatar} circle="true" className="nav-profile-img" />
              </Nav>
            )}
          </Navbar.Collapse>
        </Navbar>
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
export default connect(mapStateToProps)(NavHead);
