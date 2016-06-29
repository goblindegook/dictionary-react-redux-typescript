import * as expect from "expect";
import * as React from "react";
import { mount, shallow } from "enzyme";
import { match, Route } from "react-router";

import routes from "../routes";

describe("Router", () => {
  describe("/", () => {
    it("routes to the Search component", () => {
      match(<any> { location: "/", routes }, (error, redirectLocation, renderProps: {components: any[]}) => {
        expect(renderProps.components[1].WrappedComponent.name).toBe("Search");
      });
    });
  });

  describe("/search/:prefix", () => {
    const prefix = "test";
    const location = `/search/${prefix}`;

    it("routes to the Search component", () => {
      match(<any> { location, routes }, (error, redirectLocation, renderProps: {components: any[]}) => {
        console.log('routes', routes);
        expect(renderProps.components[1].WrappedComponent.name).toBe("Search");
      });
    });

    it("captures the prefix param", () => {
      match(<any> { location, routes }, (error, redirectLocation, renderProps: {params}) => {
        expect(renderProps.params.prefix).toBe(prefix);
      });
    });
  });

  describe("/define/:id", () => {
    const id = "test:1";
    const location = `/define/${id}`;

    it("routes to the Definition component", () => {
      match(<any> { location, routes }, (error, redirectLocation, renderProps: {components: any[]}) => {
        expect(renderProps.components[1].WrappedComponent.name).toBe("Definition");
      });
    });

    it("captures the id param", () => {
      match(<any> { location, routes }, (error, redirectLocation, renderProps: {params}) => {
        expect(renderProps.params.id).toBe(id);
      });
    });
  });
});
