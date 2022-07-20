import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Button, FormGroup, Form, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import setAuthedUsers from "../actions/authedUser";
import { useHistory } from "react-router";
import logo from '../logo.svg';
import "../styles/Login.scss";

class Login extends Component {
  state = {
    userSelected: "select",
    toHome: false,
  };

  handleChange = (e) => {
    const curUser = e.target.value;

    this.setState(() => ({
      userSelected: curUser,
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { userSelected } = this.state;

    if (userSelected !== "select") {
      this.props.dispatch(setAuthedUsers(userSelected));
      this.props.history.push("/")
      this.setState(() => ({
        userSelected: "select",
        toHome: true,
      }));
    }
  };

  render() {
    return (
      <Card className="ctn-login">
        <div className="login-header">
          <h5>Welcome to Would You Rather App!</h5>
          <p>Please sign in to continue</p>
        </div>
        <Card.Body>
          <Image width="50%" height="100" src={logo} alt="React image" className="App-logo"/>
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Form.Label placeholder="select">
                <Form.Control as="select" onChange={(e) => this.handleChange(e)}>
                  <option value="select" key="select">
                    Select user to login
                  </option>
                  {this.props.users.map((user) => {
                    return (
                      <option value={user.id} key={user.id}>
                        {user.name}
                      </option>
                    );
                  })}
                </Form.Control>
              </Form.Label>
            </FormGroup>
            <Button type="submit" variant="success">Sign In</Button>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

function mapStateToProps({ users }) {
  const userIds = Object.keys(users);
  const myUsers = userIds.map((id) => ({
    id: users[id].id,
    name: users[id].name,
  }));

  return {
    users: myUsers,
  };
}

export default connect(mapStateToProps)(Login);
