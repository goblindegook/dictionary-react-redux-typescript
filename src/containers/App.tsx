import * as React from "react";
import * as ReactDOM from "react-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

interface IAppProps extends React.Props<App> {
  children?: React.ReactNode;
}

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
          {this.props.children}
        <Footer />
      </div>
    );
  }
}
