import { shallow } from "enzyme"
import * as expect from "expect"
import * as React from "react"
import "react-dom"
import { LoadingIndicator } from "../../src/components/LoadingIndicator"

describe("Component", () => {
  describe("<LoadingIndicator />", () => {
    it("renders", () => {
      const wrapper = shallow(<LoadingIndicator />)
      expect(wrapper.is("div")).toBe(true)
    })

    it("renders with className", () => {
      const className = "test"
      const wrapper = shallow(<LoadingIndicator {...{className}} />)
      expect(wrapper.is("." + className)).toBe(true)
    })
  })
})
