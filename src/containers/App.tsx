import * as React from "react";
import * as ReactDOM from "react-dom";

import Footer from "./Footer";
import Header from "./Header";
import Search from "./Search";

export interface IAppProps extends React.Props<App> {}

export default class App extends React.Component<IAppProps, {}> {
  /**
   * Render application container.
   *
   * @return {JSX.Element} Rendered application container.
   */
  public render() {
    return (
      <div className="dictionary-app">
        <Header />
        <Search />
        <Footer />
      </div>
    );
  }
}
