import { CheerioWrapper, render, shallow } from "enzyme"
import * as expect from "expect"
import * as React from "react"
import "react-dom"
import serialize = require("serialize-javascript")
import { Document } from "../../src/containers/Document"
import { IApplicationState } from "../../src/reducers/index"
import { createMockStore } from "../_helpers/createMockStore"

describe("<Document />", () => {
  let app: JSX.Element
  let store: any
  let wrapper: CheerioWrapper<any, {}>

  beforeEach(() => {
    app = <div>App</div>
    store = createMockStore({ foo: "bar" } as any as IApplicationState)
    wrapper = render(<Document app={app} store={store} />)
  })

  it("renders a <html /> tag", () => {
    expect(wrapper.find("html").first()).toExist()
  })

  it("renders the app", () => {
    expect(wrapper.find("#root").text()).toBe("App")
  })

  it("renders serialized state inside a footer <script> tag", () => {
    expect(wrapper.find("body script").first().text())
      .toBe(`window.__PRELOADED__=${serialize(store.getState())}`)
  })

  it("renders style link tags in the header", () => {
    const assets = { main: { css: "main.css" }, vendor: { css: "vendor.css" } }
    const shallowWrapper = shallow(<Document app={app} assets={assets} store={store} />)
    const elements = shallowWrapper.find("head link") as any

    Object.keys(assets)
      .filter((chunk) => assets[chunk].css)
      .forEach((chunk) => {
        const href = assets[chunk].css
        expect(elements.nodes.filter((node: JSX.Element) => node.props.href === href).length).toBe(1)
      })
  })

  it("renders script tags in the footer", () => {
    const assets = { main: { js: "main.js" }, vendor: { js: "vendor.js" } }
    const shallowWrapper = shallow(<Document app={app} assets={assets} store={store} />)
    const elements = shallowWrapper.find("body script") as any

    Object.keys(assets)
      .filter((chunk) => assets[chunk].js)
      .forEach((chunk) => {
        const src = assets[chunk].js
        expect(elements.nodes.filter((node: JSX.Element) => node.props.src === src).length).toBe(1)
      })
  })
})
