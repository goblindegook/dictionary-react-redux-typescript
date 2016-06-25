import * as expect from "expect";
import * as React from "react";
import { mount, shallow } from "enzyme";
import { Router, Route, IndexRoute, hashHistory } from "react-router";

import routes from "../routes";

describe("Router", () => {
  it("history should use pushState", () => {
    expect(routes.props.history).toBe(hashHistory);
  });

  it("routes to the Search component on /", () => {
    // TODO: How do I test this?
  });

  it("routes to the Search component on /search/:prefix", () => {
    // TODO: How do I test this?
  });

  it("routes to the Definition component on /define/:id", () => {
    // TODO: How do I test this?
  });
});
