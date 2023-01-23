import React from "react";
import { Meteor } from "meteor/meteor";
import { render } from "react-dom";
import { App } from "/imports/ui/App";
import { NavBar } from "../imports/ui/NavBar";

Meteor.startup(() => {
  render(
    <NavBar>
      <App />
    </NavBar>,
    document.getElementById("react-target")
  );
});
