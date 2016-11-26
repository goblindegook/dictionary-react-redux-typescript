import { Request, Response } from "express"
import { Location } from "history"
import { RouterContext } from "react-router"
import { render } from "./render"

export function handleRoute(req: Request, res: Response) {
  return (error: Error, nextLocation: Location, nextState: RouterContext.RouterContextProps): void => {
    if (error) {
      res.status(500).send(error.message)

    } else if (nextLocation) {
      res.redirect(301, nextLocation.pathname + nextLocation.search)

    } else if (nextState) {
      render(req, res, nextState)

    } else {
      res.status(404).send("Not found")
    }
  }
}
