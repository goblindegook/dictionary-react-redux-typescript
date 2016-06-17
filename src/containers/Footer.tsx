import * as React from "react";
import * as ReactDOM from "react-dom";

interface IProps extends React.Props<Footer> {}

export default class Footer extends React.Component<IProps, any> {
  /**
   * Render footer container.
   *
   * @return {any} Rendered footer container.
   */
  public render(): any {
    return (
      <footer className="footer"></footer>
    );
  }
}
