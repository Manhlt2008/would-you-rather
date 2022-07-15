import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Form, Button, FormGroup } from "react-bootstrap";
import { handleAddQuestion } from "../actions/questions";
import { Redirect } from "react-router";

class NewQuestion extends Component {
  state = {
    text1: "",
    text2: "",
    toHome: false,
  };

  handleChange = (e1) => {
    const text1 = e1.target.value;

    this.setState(() => ({
      text1: text1,
    }));
  };

  handleChangenew = (e2) => {
    const text2 = e2.target.value;

    this.setState(() => ({
      text2: text2,
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log("Hello");
    const { text1, text2 } = this.state;
    const { dispatch, authedUser } = this.props;
    dispatch(handleAddQuestion(text1, text2, authedUser));
    this.setState(() => ({ toHome: true }));
  };

  render() {
    if (this.state.toHome === true) {
      return <Redirect to="/" />;
    }
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
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Form.Control
                  type="text"
                  placeholder="Enter Option One Text Here"
                  value={this.state.text1}
                  onChange={this.handleChange}
                />
                <p className="question-or">OR</p>
                <Form.Control
                  type="text"
                  placeholder="Enter Option Two Text Here"
                  value={this.state.text2}
                  onChange={this.handleChangenew}
                />
                <br />
                <br />
              </FormGroup>
              {this.state.text1 === "" || this.state.text2 === "" ? (
                <Button type="submit" disabled block>
                  Submit
                </Button>
              ) : (
                <Button variant="success" block type="submit">
                  Submit
                </Button>
              )}
            </Form>
          </Card.Body>
        <Card className="preview-card-question">
          {/* <Card.Header>
            <h4 className="preview-author">Create New Question</h4>
          </Card.Header>
          <Card.Body>
            <p className="question-preview mt-5">
              Complete the question:
              <br />
              <br />
              WOULD YOU RATHER...
            </p>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Form.Control
                  type="text"
                  placeholder="Enter Option One Text Here"
                  value={this.state.text1}
                  onChange={this.handleChange}
                />
                <p className="preview-author mt-3">OR</p>
                <Form.Control
                  type="text"
                  placeholder="Enter Option Two Text Here"
                  value={this.state.text2}
                  onChange={this.handleChangenew}
                />
                <br />
                <br />
              </FormGroup>
              {this.state.text1 === "" || this.state.text2 === "" ? (
                <Button type="submit" disabled block>
                  Submit
                </Button>
              ) : (
                <Button variant="success" block type="submit">
                  Submit
                </Button>
              )}
            </Form>
          </Card.Body> */}
        </Card>
      </div>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}

export default connect(mapStateToProps)(NewQuestion);
