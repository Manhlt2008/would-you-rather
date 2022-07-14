import React, { Component } from "react";
import "./App.css";
import Login from "./components/Login";
import { connect } from "react-redux";
import { handleInitialData } from "./actions/shared";
import Home from "./components/Home";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import NavHead from "./components/NavHead";
import NewQuestion from "./components/NewQuestion";
import QuestionPreview from "./components/QuestionPreview";
import FourOFour from "./components/FourOFour";
import Leaderboard from "./components/Leaderboard";
import LoadingBar from "react-redux-loading";

function PrivateRoute({ component: Component, authedUser, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        authedUser !== null ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
        )
      }
    />
  );
}

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    return (
      <Router>
        <LoadingBar />
        <div className="App">
          <NavHead />
          <Switch>
            <Route path="/login" exact component={Login} />
            <PrivateRoute path="/" authedUser={this.props.authedUser} exact component={Home} />
            <PrivateRoute
              path="/add"
              authedUser={this.props.authedUser}
              exact
              component={NewQuestion}
            />
            <PrivateRoute
              path="/quesitons/:id"
              authedUser={this.props.authedUser}
              exact
              component={QuestionPreview}
            />
            <PrivateRoute
              path="/leaderboard"
              authedUser={this.props.authedUser}
              exact
              component={Leaderboard}
            />
            <PrivateRoute path="/404" exact component={FourOFour} />
          </Switch>
        </div>
      </Router>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}

export default connect(mapStateToProps)(App);
