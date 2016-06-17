import * as React from "react";
import * as ReactDOM from "react-dom";

interface IProps extends React.Props<Main> {}

export default class Main extends React.Component<IProps, any> {
  /**
   * Render application container.
   *
   * @return {any} Rendered application container.
   */
  public render(): any {
    return (
      <div></div>
    );
  }
}
