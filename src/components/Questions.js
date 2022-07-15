import React, { Component } from "react";
import { connect } from "react-redux";
import { Image, Button } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

class Questions extends Component {
  render() {
    const { id } = this.props;
    return (
      <div className="ctn-questions">
        <Card className="question-card">
          <Card.Header>
            <h4 className="question-author">{this.props.name.name} asks:</h4>
          </Card.Header>
          <Card.Body>
            <Image src={this.props.name.avatarURL} roundedCircle className="author-image" />

            <div className="question-container">
              <h3>Would you rather</h3>
              <p>...{this.props.excerpt}...</p>
              <br />
              <div className="btn-action">
                <Link to={`/quesitons/${id}`}>
                  <Button variant="outline-success">View Polls</Button>
                </Link>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

function mapStateToProps({ questions, users, authedUser }, props) {
  let userId = null;
  if (props.id) {
    userId = props.id;
  } else {
    userId = props.match.params.id;
  }

  const question = questions[userId];
  const excerpt =
    question.optionOne.text.length > 13
      ? question.optionOne.text.substring(0, 14)
      : question.optionOne.text;

  return {
    question,
    excerpt,
    name: users[question.author],
    authedUser: users[authedUser],
  };
}
export default connect(mapStateToProps)(Questions);
