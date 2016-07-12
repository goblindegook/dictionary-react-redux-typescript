import * as expect from "expect";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { shallow, mount } from "enzyme";

import { createEntry, IDictionaryEntry } from "../../api/Entry";
import EntryListItem from "../EntryListItem";

describe("Component", () => {
  describe("<EntryListItem />", () => {
    let word: string;
    let id: string;
    let entry: IDictionaryEntry;

    beforeEach(() => {
      word = "word";
      id = "id";
      entry = createEntry(word, id);
    });

    it("renders", () => {
      const wrapper = shallow(<EntryListItem {...{entry}}/>);
      expect(wrapper.is("li")).toBe(true);
    });

    it("renders with className", () => {
      const className = "test";
      const wrapper = shallow(<EntryListItem {...{className, entry}} />);
      expect(wrapper.hasClass(className)).toBe(true);
    });

    it("renders with name", () => {

      const wrapper = mount(<EntryListItem {...{entry}} />);
      expect(wrapper.find("Link").text()).toBe(word);
    });

    it("renders a Link", () => {
      word = "word";
      id = "id";
      entry = createEntry(word, id);
      const wrapper = shallow(<EntryListItem {...{entry}} />);
      expect(wrapper.find("Link").prop("to")).toBe(`/define/${id}`);
    });
  });
});
