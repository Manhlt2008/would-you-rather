import React, { Component } from "react";
import { Row, Col, Image, Container } from "react-bootstrap";
import { connect } from "react-redux";

class Leaderboard extends Component {
  render() {
    return (
      <div>
        <Container>
          {this.props.users.map((user) => (
            <Row key={user.id}>
              <Col xs={4}>
                <Image src={user.avatarURL} roundedCircle className="author-image" />
              </Col>
              <Col xs={4} className="leader-stats">
                <h4>{user.name}</h4>
                <br />
                <p>Answered Questions:{Object.keys(user.answers).length}</p>
                <p>Created Questions:{Object.keys(user.questions).length}</p>
              </Col>
              <Col className="leader-score">
                <h4>Score</h4>
                <h2>{user.score}</h2>
              </Col>
            </Row>
          ))}
        </Container>
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  let usersByScore = Object.values(users)
    .map((user) => ({
      score: Object.keys(user.answers).length + Object.keys(user.questions).length,
      ...user,
    }))
    .sort((a, b) => b.score - a.score);
  return {
    users: usersByScore,
  };
}

export default connect(mapStateToProps)(Leaderboard);
