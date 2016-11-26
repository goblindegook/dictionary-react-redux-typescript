import { shallow, ShallowWrapper } from "enzyme"
import * as expect from "expect"
import * as React from "react"
import "react-dom"
import { Footer } from "../../src/components/Footer"

describe("Component", () => {
  describe("<Footer />", () => {
    let wrapper: ShallowWrapper<any, {}>

    before(() => {
      wrapper = shallow(<Footer />)
    })

    it("renders", () => {
      expect(wrapper.is("footer")).toBe(true)
    })
  })
})
