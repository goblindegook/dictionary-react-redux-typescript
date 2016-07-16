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
          <link rel="shortcut icon" href="/favicon.ico" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </head>
        <body>
          <div
            className="dictionary"
            id="root"
            dangerouslySetInnerHTML={{__html: app}}
          />
          <script dangerouslySetInnerHTML={{
            __html: `window.__PRELOADED__=${serialize(state)};`,
          }} id="preloaded" />
          <script src="/static/bundle.js"></script>
        </body>
      </html>
    );
  }
}
