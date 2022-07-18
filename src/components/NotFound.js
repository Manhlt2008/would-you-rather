import React, { Component } from "react";
import { connect } from "react-redux";
import { Image, Button } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

const NotFound = () => {
    return (
    <div>
      <h1>404 NOT FOUND</h1>
    </div>
  );
};

export default NotFound;
