import * as React from "react";
import * as cx from "classnames";
import "react-dom";

/* tslint:disable:no-var-requires */
const styles = require("./Header.style.scss");
/* tslint:enable:no-var-requires */

export interface IHeaderProps extends React.ClassAttributes<Header> {
  title: string;
}

export default class Header extends React.Component<IHeaderProps, {}> {
  /**
   * Render header container.
   *
   * @return {JSX.Element} Rendered header container.
   */
  public render() {
    return (
      <header className="header">
        <h1 className={cx(styles.title)}>
          {this.props.title}
        </h1>
      </header>
    );
  }
}
