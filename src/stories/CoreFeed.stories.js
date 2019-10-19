import React from "react";
import StorybookWrapper from "./storybookWrapper.js";
import baseProps from "./baseProps.js";
import Component from "../components/views/CoreFeed/index.js";

export default {
  title: "Cards|CoreFeed",
};
export const CoreFeed = () => (
  <StorybookWrapper>
    <Component {...baseProps} />
  </StorybookWrapper>
);
