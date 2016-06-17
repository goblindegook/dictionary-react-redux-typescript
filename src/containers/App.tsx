import * as React from "react";
import * as ReactDOM from "react-dom";

import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";

interface IProps extends React.Props<App> {}

export default class App extends React.Component<IProps, any> {
  /**
   * Render application container.
   *
   * @return {any} Rendered application container.
   */
  public render(): any {
    return (
      <div>
        <Header />
        <Main />
        <Footer />
      </div>
    );
  }
}
