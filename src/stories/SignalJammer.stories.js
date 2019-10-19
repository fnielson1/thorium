import React from "react";
import StorybookWrapper from "./storybookWrapper.js";
import baseProps from "./baseProps.js";
import Component from "../components/views/SignalJammer/index.js";
import CoreComponent from "../components/views/SignalJammer/core.js";

export default {
  title: "Cards|SignalJammer",
};
export const SignalJammer = () => (
  <StorybookWrapper>
    <Component {...baseProps} />
  </StorybookWrapper>
);
export const Core = () => (
  <StorybookWrapper>
    <CoreComponent {...baseProps} />
  </StorybookWrapper>
);
