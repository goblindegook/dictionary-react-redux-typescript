import * as React from "react";
import * as ReactDOM from "react-dom";

interface IProps extends React.Props<Header> {}

export default class Header extends React.Component<IProps, any> {
  /**
   * Render header container.
   *
   * @return {any} Rendered header container.
   */
  public render(): any {
    return (
      <header className="header"></header>
    );
  }
}
