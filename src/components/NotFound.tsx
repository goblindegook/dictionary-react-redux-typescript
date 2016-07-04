import * as React from "react";
import * as ReactDOM from "react-dom";

export interface INotFoundProps extends React.Props<NotFound> {}

export default class NotFound extends React.Component<INotFoundProps, {}> {
  /**
   * Render footer container.
   *
   * @return {JSX.Element} Rendered footer container.
   */
  public render() {
    return (
      <div className="error">Nothing found.</div>
    );
  }
}
