import * as React from "react";
import "react-dom";
import * as cx from "classnames";
import Footer from "../components/Footer";
import Header from "../components/Header";

/* tslint:disable:no-var-requires */
const styles = require("./App.scss");
/* tslint:enable:no-var-requires */

interface IAppProps extends React.ClassAttributes<App> {}

export default class App extends React.Component<IAppProps, {}> {
  /**
   * Render application container.
   *
   * @return {JSX.Element} Rendered application container.
   */
  public render() {
    return (
      <div className={cx("dictionary-app", styles.app)}>
        <Header />
          {this.props.children}
        <Footer />
      </div>
    );
  }
}
