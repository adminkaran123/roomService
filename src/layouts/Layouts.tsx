import React, { Component } from "react";
import { Outlet, useLocation } from "react-router-dom";

export default class Layouts extends Component {
  render() {
    return (
      <div>
        <Outlet />
      </div>
    );
  }
}
