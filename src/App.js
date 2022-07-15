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
  Redirect,
  useLocation,
} from "react-router-dom";
import TopHeader from "./components/TopHeader";
import NewQuestion from "./components/NewQuestion";
import QuestionPreview from "./components/QuestionPreview";
import FourOFour from "./components/FourOFour";
import Leaderboard from "./components/Leaderboard";
import LoadingBar from "react-redux-loading";
import setAuthedUsers from "./actions/authedUser";

function PrivateRoute({ component: Component, authedUser, location, ...rest }) {
  const history = useHistory();
  const pathName = location ? location.pathname : "";
  if (!authedUser && pathName && !pathName.includes("login")) {
    history.push("/login");
  }

  return <Route {...rest} render={(props) => <Component {...props} />} />;
}
const App = ({ authedUser, ...rest }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(handleInitialData());
  }, []);
  return (
    <Router>
      <LoadingBar />
      <div className="App">
        <TopHeader />
        <Switch>
          <Route path="/login" component={Login} />
          <PrivateRoute path="/" authedUser={authedUser} exact component={Home} />
          <PrivateRoute path="/add" authedUser={authedUser} exact component={NewQuestion} />
          <PrivateRoute
            authedUser={authedUser}
            path="/quesitons/:id"
            exact
            component={QuestionPreview}
          />
          <PrivateRoute authedUser={authedUser} path="/leaderboard" exact component={Leaderboard} />
          <PrivateRoute authedUser={authedUser} path="/404" exact component={FourOFour} />
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
