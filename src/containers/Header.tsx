import * as React from "react";
import * as ReactDOM from "react-dom";

export interface IHeaderProps extends React.Props<Header> {}

export default class Header extends React.Component<IHeaderProps, {}> {
  /**
   * Render header container.
   *
   * @return {JSX.Element} Rendered header container.
   */
  public render() {
    return (
      <header className="header"></header>
    );
  }
}
