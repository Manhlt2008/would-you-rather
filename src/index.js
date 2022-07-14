import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { createStore } from "redux";
import allReducers from "./reducers";
import middleware from "./middleware";
import { BrowserRouter as Router, Route, Switch, useHistory ,withRouter,Redirect, useLocation } from "react-router-dom";
const store = createStore(allReducers, middleware);
ReactDOM.render(
  <Provider store={store}>
   <Router>

   <App />
   </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
