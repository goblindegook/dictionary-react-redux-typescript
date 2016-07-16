import * as React from "react";
import "react-dom";

export interface ILoadingIndicatorProps extends React.ClassAttributes<LoadingIndicator> {}

export default class LoadingIndicator extends React.Component<ILoadingIndicatorProps, {}> {
  /**
   * Render footer container.
   *
   * @return {JSX.Element} Rendered footer container.
   */
  public render() {
    return (
      <div className="loading">Loading...</div>
    );
  }
}
