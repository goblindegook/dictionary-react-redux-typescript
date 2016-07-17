import * as React from "react";
import "react-dom";
import { renderToString } from "react-dom/server";
import * as Helmet from "react-helmet";
import serialize = require("serialize-javascript");

interface IDocumentProps extends React.ClassAttributes<Document> {
  app?: React.ReactElement<any>;
  server?: Boolean;
  store: any;
}

/**
 * Document component class.
 *
 * This class is to be used for server-side rendering only. A boolean
 * `server` property has been supplied to prevent `Helmet.rewind()` from
 * running during tests.
 */
export default class Document extends React.Component<IDocumentProps, {}> {
  /**
   * Render document for the server.
   *
   * @return {JSX.Element} Rendered document.
   */
  public render() {
    const app = this.props.app ? renderToString(this.props.app) : "";
    const state = this.props.store.getState();
    // Helmet.rewind() must be called after ReactDOMServer.renderToString():
    const head = this.props.server ? Helmet.rewind() : null;

    return (
      <html>
        <head>
          {head && head.title.toComponent()}
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <link
            href="https://fonts.googleapis.com/css?family=Playfair+Display:400,400italic,700,700italic"
            rel="stylesheet"
            type="text/css" />
        </head>
        <body>
          <div
            className="dictionary"
            id="root"
            dangerouslySetInnerHTML={{__html: app}}
          />
          <script id="preloaded" type="text/javascript" dangerouslySetInnerHTML={{
            __html: `window.__PRELOADED__=${serialize(state)};`,
          }} />
          <script src="/static/bundle.js"></script>
        </body>
      </html>
    );
  }
}
