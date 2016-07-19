import * as React from "react";
import * as cx from "classnames";
import "react-dom";

/* tslint:disable:no-var-requires */
const styles = require("./LoadingIndicator.style.scss");
/* tslint:enable:no-var-requires */

export interface ILoadingIndicatorProps extends React.ClassAttributes<LoadingIndicator> {
  className?: string;
}

export default class LoadingIndicator extends React.Component<ILoadingIndicatorProps, {}> {
  /**
   * Render footer container.
   *
   * @return {JSX.Element} Rendered footer container.
   */
  public render() {
    return (
      <div className={cx(styles.loader, this.props.className)}>A carregar...</div>
    );
  }
}
