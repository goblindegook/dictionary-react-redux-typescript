import render from "./render";

export default function handleRoute(req, res, next) {
  return (error: Error, redirectLocation: Location, renderProps: any): void => {
    if (error) {
      res.status(500).send(error.message);

    } else if (redirectLocation) {
      res.redirect(301, redirectLocation.pathname + redirectLocation.search);

    } else if (renderProps) {
      render(req, res, renderProps);

    } else {
      res.status(404).send("Not found");
    }
  };
}
