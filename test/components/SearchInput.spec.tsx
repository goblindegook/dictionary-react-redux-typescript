import { shallow } from "enzyme"
import * as expect from "expect"
import * as React from "react"
import "react-dom"
import * as sinon from "sinon"
import { LoadingIndicator } from "../../src/components/LoadingIndicator"
import { SearchInput } from "../../src/components/SearchInput"

describe("<SearchInput />", () => {
  it("renders", () => {
    const wrapper = shallow(<SearchInput />)
    expect(wrapper.find("input").length).toBe(1)
  })

  it("renders with className", () => {
    const className: string = "test"
    const wrapper = shallow(<SearchInput {...{className}} />)
    expect(wrapper.hasClass(className)).toBe(true)
  })

  it("invokes onChange callbacks", () => {
    const onChange = sinon.spy()
    const event = { target: { value: "test" } }
    const wrapper = shallow(<SearchInput {...{onChange}} />)
    wrapper.find("input").simulate("change", event)
    expect(onChange.callCount).toBe(1)
    expect(onChange.calledWith(event)).toBe(true)
  })

  context("when pressing the Enter key", () => {
    it("invokes onSubmit callbacks with field value", () => {
      const onSubmit = sinon.spy()
      const text = "test"
      const wrapper = shallow(<SearchInput {...{onSubmit, text}} />)
      const event = { keyCode: 13 }
      wrapper.find("input").simulate("keyup", event)
      expect(onSubmit.callCount).toBe(1)
      expect(onSubmit.calledWith(text)).toBe(true)
    })
  })

  context("when loading", () => {
    it("displays a loading indicator", () => {
      const isLoading = true
      const wrapper = shallow(<SearchInput {...{isLoading}} />)
      expect(wrapper.find(LoadingIndicator).length).toBe(1)
    })
  })

  context("when not loading", () => {
    it("does not display a loading indicator", () => {
      const isLoading = false
      const wrapper = shallow(<SearchInput {...{isLoading}} />)
      expect(wrapper.find(LoadingIndicator).length).toBe(0)
    })
  })
})
