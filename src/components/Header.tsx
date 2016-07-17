import * as React from "react";
import "react-dom";

export interface IHeaderProps extends React.ClassAttributes<Header> {}

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
