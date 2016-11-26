import * as expect from "expect"
import { Location } from "history"
import { match, RouterContext } from "react-router"
import { routes } from "../src/routes"

describe("Router", () => {
  describe("/", () => {
    const location = "/"

    it("routes to the Search component", () => {
      match({ location, routes }, (error: Error, nextLocation: Location, state: RouterContext.RouterContextProps) => {
        expect((state.components![1] as any).WrappedComponent.name).toBe("Search")
      })
    })
  })

  describe("/search/:prefix", () => {
    const prefix = "test"
    const location = `/search/${prefix}`

    it("routes to the Search component", () => {
      match({ location, routes }, (error: Error, nextLocation: Location, state: RouterContext.RouterContextProps) => {
        expect((state.components![1] as any).WrappedComponent.name).toBe("Search")
      })
    })

    it("captures the prefix param", () => {
      match({ location, routes }, (error: Error, nextLocation: Location, state: { params: any }) => {
        expect(state.params.prefix).toBe(prefix)
      })
    })
  })

  describe("/define/:id", () => {
    const id = "test:1"
    const location = `/define/${id}`

    it("routes to the Definition component", () => {
      match({ location, routes }, (error: Error, nextLocation: Location, state: RouterContext.RouterContextProps) => {
        expect((state.components![1] as any).WrappedComponent.name).toBe("Definition")
      })
    })

    it("captures the id param", () => {
      match({ location, routes }, (error: Error, nextLocation: Location, state: { params: any }) => {
        expect(state.params.id).toBe(id)
      })
    })
  })
})
