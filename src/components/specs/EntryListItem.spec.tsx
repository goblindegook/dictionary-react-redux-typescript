import * as expect from "expect";
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as sinon from "sinon";
import { shallow } from "enzyme";

import EntryListItem from "../EntryListItem";

describe("Containers", () => {
  describe("<EntryListItem />", () => {
    it("should render", () => {
      const wrapper = shallow(<EntryListItem />);
      expect(wrapper.is("li")).toBe(true);
    });

    it("should render with className", () => {
      const className = "test";
      const wrapper = shallow(<EntryListItem {...{className}} />);
      expect(wrapper.hasClass(className)).toBe(true);
    });

    it("should render with name", () => {
      const label = "test";
      const wrapper = shallow(<EntryListItem {...{label}} />);
      expect(wrapper.find("li").text()).toBe(label);
    });

    it("should invoke onClick callbacks", () => {
      const onClick = sinon.spy();
      const wrapper = shallow(<EntryListItem {...{onClick}} />);
      wrapper.find("a").first().simulate("click");
      expect(onClick.callCount).toBe(1);
    });
  });
});
