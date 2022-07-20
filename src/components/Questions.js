import React, { Component } from "react";
import { connect } from "react-redux";
import { Image, Button } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

const Questions = ({ id, name = {name: "",avatarURL: "" }, excerpt }) => {
  const history = useHistory();
  const handleRoute = (id) => {
    history.push(`/quesitons/${id}`);
  };
  console.log(excerpt);
  return (
    <div className="ctn-questions">
      <Card className="question-card">
        <Card.Header>
          <h4 className="question-author">{name.name} asks:</h4>
        </Card.Header>
        <Card.Body>
          <Image src={name.avatarURL} className="author-image" />

          <div className="question-container">
            <h3>Would you rather</h3>
            <p>...{excerpt}...</p>
            <br />
            <div className="btn-action">
              <Button onClick={() => handleRoute(id)} variant="outline-success">
                View Polls
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

function mapStateToProps({ questions, users, authedUser }, props) {
  let userId = null;
  if (props.id) {
    userId = props.id;
  } else {
    userId = props.match.params.id;
  }

  const question = questions[userId];
  const excerpt =
    question.optionOne.text.length > 30
      ? question.optionOne.text.substring(0, 29)
      : question.optionOne.text;

  return {
    question,
    excerpt,
    name: users[question.author],
    authedUser: users[authedUser],
  };
}
export default connect(mapStateToProps)(Questions);
