import * as React from "react";
import "react-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

interface IAppProps extends React.ClassAttributes<App> {}

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
