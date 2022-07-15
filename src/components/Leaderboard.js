import React, { Component } from "react";
import { Row, Col, Image, Container } from "react-bootstrap";
import { connect } from "react-redux";
import "../styles/PageStyle.scss";
class Leaderboard extends Component {
  render() {
    return (
      <div className="ctn-leader-boad">
        <Container>
          {this.props.users.map((user) => (
            <Row key={user.id} className="board-item">
              <Col xs={3}>
                <Image src={user.avatarURL} roundedCircle className="board-avatar" />
              </Col>
              <Col xs={6} className="board-content">
                <h4>{user.name}</h4>
                <br />
                <div className="board-report border-bottom">Answered Questions:<span className="board-score">{Object.keys(user.answers).length}</span></div>
                <div className="board-report">Created Questions:<span className="board-score">{Object.keys(user.questions).length}</span></div>
              </Col>
              <Col xs={3} className="board-total-score">
                <div className="board-total-score-header">Score</div>
                <div className="board-total-score-number">{user.score}</div>
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
