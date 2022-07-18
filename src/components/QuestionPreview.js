import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Image } from "react-bootstrap";
import { ProgressBar, Card, Form, Button, FormGroup } from "react-bootstrap";
import { Redirect, withRouter } from "react-router";
import { handleAddQuestionAnswer } from "../actions/questions";

class QuestionPreview extends Component {
  state = {
    answerSelected: null,
  };
  handleChange = (e) => {
    const answerSelected = e.target.id;
    this.setState(() => ({
      answerSelected,
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { dispatch, authedUser, question } = this.props;
    const { answerSelected } = this.state;
    const qid = question.id;
    dispatch(handleAddQuestionAnswer(authedUser, qid, answerSelected));
  };

  render() {
    if (this.props.validId === "false") {
      return <Redirect to="/404" />;
    }

    return (
      <div className="ctn-preview-question">
        {!this.props.authedUserAns ? (
          <Card className="preview-card">
            <Card.Header>
              <h4 className="preview-author">{this.props.username.name} asks:</h4>
            </Card.Header>
            <Card.Body>
              <Image src={this.props.avatar} roundedCircle className="author-image" />
              <div className="preview-container-card">
                <h3>Would you rather...</h3>
                <br />
                <Form onSubmit={(e) => this.handleSubmit(e)}>
                  <FormGroup>
                    <strong>
                      <Form.Check
                        type="radio"
                        id="optionOne"
                        name="radioselect"
                        label={this.props.optionOne}
                        onChange={(e) => this.handleChange(e)}
                      />
                    </strong>
                    <p className="preview-author mt-3">OR</p>
                    <strong>
                      <Form.Check
                        type="radio"
                        id="optionTwo"
                        name="radioselect"
                        label={this.props.optionTwo}
                        onChange={(e) => this.handleChange(e)}
                      />
                    </strong>
                    <br />
                    <br />
                  </FormGroup>
                  {this.state.answerSelected === null ? (
                    <Button variant="success" block disabled type="submit">
                      Submit
                    </Button>
                  ) : (
                    <Button variant="success" block type="submit">
                      Submit
                    </Button>
                  )}
                </Form>
              </div>
            </Card.Body>
          </Card>
        ) : (
          <Card className="preview-card mt-4">
            <Card.Header>
              <h4 className="preview-author">Asked by {this.props.username.name}</h4>
            </Card.Header>
            <Card.Body>
              <h3>Results:</h3>
              <Image src={this.props.avatar} className="author-image" />
              <div className="preview-container">
                <div className="card-position">
                  Would you rather {this.props.question[this.props.authedUserAns].text}?
                  {this.props.authedUserAns === "optionOne" ? (
                    <Fragment>
                      <ProgressBar
                        now={(this.props.optionOneVote / this.props.votes) * 100}
                        className="progress-template"
                      />
                      {this.props.optionOneVote} out of {this.props.votes} votes
                    </Fragment>
                  ) : (
                    <Fragment>
                      <ProgressBar
                        now={(this.props.optionTwoVote / this.props.votes) * 100}
                        className="progress-template"
                      />
                      {this.props.optionTwoVote} out of {this.props.votes} votes
                    </Fragment>
                  )}
                  <br />
                  <br />
                  Would you rather{" "}
                  {this.props.authedUserAns === "optionOne"
                    ? this.props.question.optionTwo.text
                    : this.props.question.optionOne.text}
                  ?
                  {this.props.authedUserAns === "optionTwo" ? (
                    <Fragment>
                      <ProgressBar
                        now={(this.props.optionOneVote / this.props.votes) * 100}
                        className="progress-template"
                      />
                      {this.props.optionOneVote} out of {this.props.votes} votes
                    </Fragment>
                  ) : (
                    <Fragment>
                      <ProgressBar
                        now={(this.props.optionTwoVote / this.props.votes) * 100}
                        className="progress-template"
                      />
                      {this.props.optionTwoVote} out of {this.props.votes} votes
                    </Fragment>
                  )}
                </div>
              </div>
            </Card.Body>
          </Card>
        )}
      </div>
    );
  }
}
function mapStateToProps({ users, questions, authedUser }, props) {
  let userId = null;
  if (props.id) {
    userId = props.id;
  } else {
    userId = props.match.params.id;
  }

  let validId = true;
  if (Object.keys(questions).filter((id) => id === userId).length <= 0) return { validId: false };

  const question = questions[userId];

  const optionOne = question.optionOne.text;
  const optionTwo = question.optionTwo.text;
  const username = users[question.author];
  const avatar = users[question.author].avatarURL;
  let authedUserAns = null;

  authedUserAns = users[authedUser].answers[question.id];

  const optionOneVote = question.optionOne.votes.length;
  const optionTwoVote = question.optionTwo.votes.length;
  const votes = optionOneVote + optionTwoVote;

  return {
    optionOne,
    optionTwo,
    username,
    avatar,
    authedUserAns,
    optionOneVote,
    optionTwoVote,
    votes,
    question,
    validId,
    authedUser,
  };
}

export default (connect(mapStateToProps)(QuestionPreview));
