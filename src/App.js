import React, { Component, useEffect } from "react";
import "./App.css";
import Login from "./components/Login";
import { connect, useDispatch } from "react-redux";
import { handleInitialData } from "./actions/shared";
import Home from "./components/Home";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
  withRouter,
} from "react-router-dom";
import TopHeader from "./components/TopHeader";
import NewQuestion from "./components/NewQuestion";
import QuestionPreview from "./components/QuestionPreview";
import Leaderboard from "./components/Leaderboard";
import NotFound from "./components/NotFound";

function PrivateRoute({ component: Component, authedUser, location, ...rest }) {
  const history = useHistory();
  const pathName = location ? location.pathname : "";
  if (!authedUser && pathName && !pathName.includes("login")) {
    history.push("/login");
  }

  return <Route {...rest} render={(props) => <Component {...props} />} />;
}


const FF = () => {
  return <div>
    404
  </div>
}

const App = ({ authedUser, ...rest }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(handleInitialData());
  }, []);
  return (
    <Router>
      <div className="App">
        <TopHeader />
        <Switch>
          <Route path="/login" component={Login} />
          <PrivateRoute path="/" authedUser={authedUser} exact component={Home} />
          <PrivateRoute path="/add" authedUser={authedUser} exact component={NewQuestion} />
          <PrivateRoute path="/quesitons/:id" authedUser={authedUser} exact component={QuestionPreview} />
          <PrivateRoute authedUser={authedUser} path="/leaderboard" exact component={Leaderboard} />
          <Route  path="/404"  component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
};

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}

export default connect(mapStateToProps)(withRouter(App));
