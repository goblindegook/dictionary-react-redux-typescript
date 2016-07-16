import * as React from "react";
import "react-dom";

export interface IFooterProps extends React.Props<Footer> {}

export default class Footer extends React.Component<IFooterProps, {}> {
  /**
   * Render footer container.
   *
   * @return {JSX.Element} Rendered footer container.
   */
  public render() {
    return (
      <footer className="footer"></footer>
    );
  }
}
