import * as React from "react";
import "react-dom";

export interface IErrorProps extends React.Props<Error> {
  message?: string;
}

export default class Error extends React.Component<IErrorProps, {}> {
  /**
   * Render footer container.
   *
   * @return {JSX.Element} Rendered footer container.
   */
  public render() {
    return (
      <div className="error">
        <div className="message">{this.props.message || "Error"}</div>
      </div>
    );
  }
}
