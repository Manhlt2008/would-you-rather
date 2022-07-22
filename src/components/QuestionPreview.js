import React, { Component, Fragment, useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { Image } from "react-bootstrap";
import { ProgressBar, Card, Form, Button, FormGroup } from "react-bootstrap";
import { handleAddQuestionAnswer } from "../actions/questions";
import { useHistory } from "react-router-dom";

const QuestionPreview = ({ username = { name: "" }, ...props }) => {
  //console.log(props);
  const [answerSelected, setAnswerSelected] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const handleChange = (e) => {
    const answerSelected = e.target.id;
    setAnswerSelected(answerSelected);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { authedUser, question } = props;
    const qid = question.id;
    dispatch(handleAddQuestionAnswer(authedUser, qid, answerSelected));
  };
  useEffect(() => {
    console.log("useEffect");
    if (props.validId === false) {
      history.push({
        pathname: "/login",
        state: { urlPrevious: "/404" },
      });
    }
  }, []);
  return (
    <div className="ctn-preview-question">
      {!props.authedUserAns ? (
        <Card>
          <Card.Header>
            <div className="preview-author">{username.name} asks:</div>
          </Card.Header>
          <Card.Body>
            <Image src={props.avatar} className="preview-image" />
            <div className="preview-container-card">
              <div className="title">Would you rather...</div>
              <br />
              <Form onSubmit={(e) => handleSubmit(e)}>
                <FormGroup>
                  <Form.Check
                    type="radio"
                    id="optionOne"
                    name="radioselect"
                    label={props.optionOne}
                    onChange={(e) => handleChange(e)}
                  />
                  <Form.Check
                    type="radio"
                    id="optionTwo"
                    name="radioselect"
                    label={props.optionTwo}
                    onChange={(e) => handleChange(e)}
                  />
                </FormGroup>
                {answerSelected === null ? (
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
        <Card className="preview-card">
          <Card.Header>
            <h4 className="preview-author">Asked by {username.name}</h4>
          </Card.Header>
          <Card.Body>
            <h3>Results:</h3>
            <Image src={props.avatar} className="preview-image" />
            <div className="preview-container-card">
              <div className="card-position">
                Would you rather {props.question[props.authedUserAns].text}?
                {props.authedUserAns === "optionOne" ? (
                  <Fragment>
                    <ProgressBar
                      now={(props.optionOneVote / props.votes) * 100}
                      className="progress-template"
                    />
                    <h5>
                      {props.optionOneVote} out of {props.votes} votes
                    </h5>
                  </Fragment>
                ) : (
                  <Fragment>
                    <ProgressBar
                      now={(props.optionTwoVote / props.votes) * 100}
                      className="progress-template"
                    />
                    <h5>
                      {props.optionTwoVote} out of {props.votes} votes
                    </h5>
                  </Fragment>
                )}
                Would you rather{" "}
                {props.authedUserAns === "optionOne"
                  ? props.question.optionTwo.text
                  : props.question.optionOne.text}
                ?
                {props.authedUserAns === "optionTwo" ? (
                  <Fragment>
                    <ProgressBar
                      now={(props.optionOneVote / props.votes) * 100}
                      className="progress-template"
                    />
                    <h5>
                      {props.optionOneVote} out of {props.votes} votes
                    </h5>
                  </Fragment>
                ) : (
                  <Fragment>
                    <ProgressBar
                      now={(props.optionTwoVote / props.votes) * 100}
                      className="progress-template"
                    />
                    <h5>
                      {props.optionTwoVote} out of {props.votes} votes
                    </h5>
                  </Fragment>
                )}
              </div>
            </div>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};
function mapStateToProps({ users, questions, authedUser }, props) {
  let userId = null;
  console.log("mapStateToProps");
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

  authedUserAns = users[authedUser] ? users[authedUser].answers[question.id] : null;

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

export default connect(mapStateToProps)(QuestionPreview);
