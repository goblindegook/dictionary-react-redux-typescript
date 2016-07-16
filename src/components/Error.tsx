import * as React from "react";
import "react-dom";

export interface IErrorProps extends React.ClassAttributes<Error> {
  message?: string;
}

export default class Error extends React.Component<IErrorProps, {}> {
  /**
   * Render error component.
   *
   * @return {JSX.Element} Rendered error component.
   */
  public render() {
    return (
      <div className="error">
        <div className="message">{this.props.message || "Erro"}</div>
      </div>
    );
  }
}
