import * as React from "react";
import * as ReactDOM from "react-dom";
import { renderToString } from "react-dom/server";
import { Provider } from "react-redux";
import { RouterContext } from "react-router";
import * as Helmet from "react-helmet";
import serialize = require("serialize-javascript");

interface IDocumentProps extends React.Props<Document> {
  app: React.ReactElement<any>;
  assets?: {
    [key: string]: any;
  };
  server?: Boolean;
  store: any;
}

export default class Document extends React.Component<IDocumentProps, {}> {
  /**
   * Render application container.
   *
   * @return {JSX.Element} Rendered application container.
   */
  public render() {
    const app = renderToString(this.props.app);
    const state = this.props.store.getState();

    return (
      <html>
        <head>
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
            __html: `window.__PRELOADED__=${serialize(state)};`
          }} />
          <script src="/static/bundle.js"></script>
        </body>
      </html>
    );
  }
}
