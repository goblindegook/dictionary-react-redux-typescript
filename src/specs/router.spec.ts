import * as expect from "expect";
import * as React from "react";
import { mount, shallow } from "enzyme";
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import router from "../router";

function getRouterComponent(path) {

}

describe("Router", () => {
  it("history should use pushState", () => {
    expect(router.props.history).toBe(browserHistory);
  });

  it("should route to the Search component by default", () => {
    // TODO: How do I test this?
  });

  it("should route to the Search component on /search/:query", () => {
    // TODO: How do I test this?
  });

  it("should route to the Definition component on /define/:word", () => {
    // TODO: How do I test this?
  });

  it("should route to the Definition component on /define/:word/:index", () => {
    // TODO: How do I test this?
  });
});
