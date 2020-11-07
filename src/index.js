import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Compare from "./Pages/Compare";
import NotFound from "./Pages/NotFound";

ReactDOM.render(
  <Router basename="/gonultas15">
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/compare" exact component={Compare} />
      <Route path='*' exact={true} component={NotFound} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
