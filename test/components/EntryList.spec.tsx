import { shallow } from "enzyme"
import * as expect from "expect"
import * as React from "react"
import "react-dom"
import { createEntry, IEntry } from "../../src/api/Entry"
import { EntryList } from "../../src/components/EntryList"
import { EntryListItem } from "../../src/components/EntryListItem"

describe("Component", () => {
  describe("<EntryList />", () => {
    let entries: IEntry[]

    before(() => {
      entries = ["one", "two", "three"].map((value) =>
        createEntry(value, value, { "@n": "1", "@id": "n:1", "form": { orth: "n" }, "sense": [] }))
    })

    it("should render", () => {
      const wrapper = shallow(<EntryList {...{entries}} />)
      expect(wrapper.is("ul")).toBe(true)
    })

    it("should render <EntryList /> with className", () => {
      const className: string = "test"
      const wrapper = shallow(<EntryList {...{className, entries}} />)
      expect(wrapper.hasClass(className)).toBe(true)
    })

    it("should contain all entries inside <EntryListItem /> components", () => {
      const wrapper = shallow(<EntryList {...{entries}} />)
      expect(wrapper.find(EntryListItem).length).toBe(entries.length)
    })
  })
})
