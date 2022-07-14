import React, { Component } from "react";
import { Tabs, Tab } from "react-bootstrap";
import { connect } from "react-redux";
import Questions from "./Questions";

class Home extends Component {
  state = {
    answered: "unanswered",
  };

  handleTab = (data) => {
    this.setState(() => ({
      answered: data,
    }));
  };
  render() {
    return (
      <div className="container">
        <Tabs id="HomePage" activeKey={this.state.answered} onSelect={this.handleTab}>
          <Tab eventKey="answered" title="Answered">
            {this.props.answeredQuestions.map((id) => {
              return <Questions id={id} key={id} />;
            })}
          </Tab>
          <Tab eventKey="unanswered" title="Unanswered">
            {this.props.unansweredQuestions.map((id) => {
              return <Questions id={id} key={id} className="preview-li" />;
            })}
          </Tab>
        </Tabs>
      </div>
    );
  }
}
function mapStateToProps({ questions, users, authedUser }) {
  const answeredQuestions = Object.keys(users[authedUser].answers);

  const unansweredQuestions = Object.keys(questions).filter((qid) => {
    const match = answeredQuestions.filter((ansId) => ansId === qid); //need to check if the questions match
    if (match === undefined || match.length === 0) return qid;
    return false;
  });
  const answeredQuestionsByDate = answeredQuestions.sort(
    (a, b) => (questions[a].timestamp - questions[b].timestamp) * -1
  );
  const unansweredQuestionsByDate = unansweredQuestions.sort(
    (a, b) => (questions[a].timestamp - questions[b].timestamp) * -1
  );
  return {
    answeredQuestions: answeredQuestionsByDate,
    unansweredQuestions: unansweredQuestionsByDate,
  };
}
export default connect(mapStateToProps)(Home);
