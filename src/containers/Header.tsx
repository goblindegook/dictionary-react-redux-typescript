import * as React from "react";
import * as ReactDOM from "react-dom";

interface IProps extends React.Props<Header> {}

export default class Header extends React.Component<IProps, any> {
  /**
   * Render application container.
   *
   * @return {any} Rendered application container.
   */
  public render(): any {
    return (
      <div className="dictionary-header"></div>
    );
  }
}
