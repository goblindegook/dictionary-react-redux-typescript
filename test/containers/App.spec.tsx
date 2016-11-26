import { shallow, ShallowWrapper } from "enzyme"
import * as expect from "expect"
import * as React from "react"
import "react-dom"
import { Footer } from "../../src/components/Footer"
import { Header } from "../../src/components/Header"
import { App } from "../../src/containers/App"

describe("<App />", () => {
  let wrapper: ShallowWrapper<any, {}>

  before(() => {
    wrapper = shallow(<App />)
  })

  it("renders a <div />", () => {
    expect(wrapper.find("div").first().hasClass("dictionary-app")).toBe(true)
  })

  it("contains a single <Header /> component", () => {
    expect(wrapper.find(Header).length).toBe(1)
  })

  it("allows children components", () => {
    wrapper = shallow(<App><section className="child" /></App>)
    expect(wrapper.find("section.child").length).toBe(1)
  })

  it("contains a single <Footer /> component", () => {
    expect(wrapper.find(Footer).length).toBe(1)
  })
})
