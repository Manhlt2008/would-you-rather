import React, { Component, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Card, Form, Button, FormGroup } from "react-bootstrap";
import { handleAddQuestion } from "../actions/questions";
import { Redirect } from "react-router";
import {useHistory} from "react-router-dom";

const NewQuestion = ({authedUser}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [optionText1, setOptionText1] = useState("");
  const [optionText2, setOptionText2] = useState("");
  const handleChange = (e) => {
    const text = e.target.value;
    setOptionText1(text);
  };

  const handleChangenew = (e) => {
    const text = e.target.value;
    setOptionText2(text);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(handleAddQuestion(optionText1, optionText2, authedUser));
    history.push("/");
  };
  return (
    <div className="ctn-new-question">
      <Card.Header>
        <h4 className="preview-author">Create New Question</h4>
      </Card.Header>
      <Card.Body>
        <p className="question-preview">
          Complete the question:
          <br />
          <strong>would you rather...</strong>
        </p>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Form.Control
              type="text"
              placeholder="Enter Option One Text Here"
              value={optionText1}
              onChange={handleChange}
            />
            <p className="question-or">OR</p>
            <Form.Control
              type="text"
              placeholder="Enter Option Two Text Here"
              value={optionText2}
              onChange={handleChangenew}
            />
            <br />
            <br />
          </FormGroup>
          {optionText1 === "" || optionText2 === "" ? (
            <Button type="submit" disabled variant="success">
              Submit
            </Button>
          ) : (
            <Button variant="success" type="submit">
              Submit
            </Button>
          )}
        </Form>
      </Card.Body>
    </div>
  );
};

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}

export default connect(mapStateToProps)(NewQuestion);
