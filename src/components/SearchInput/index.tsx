import * as React from "react";
import * as cx from "classnames";
import "react-dom";

/* tslint:disable:no-var-requires */
const styles = require("./style.scss");
/* tslint:enable:no-var-requires */

export interface ISearchInputProps extends React.ClassAttributes<SearchInput> {
  className?: string;
  text?: string;
  onChange?(event: React.FormEvent): void;
  onSubmit?(prefix: String): void;
}

export default class SearchInput extends React.Component<ISearchInputProps, {}> {
  /**
   * Render application container.
   *
   * @return {JSX.Element} Rendered application container.
   */
  public render() {
    return (
      <input
        type="search"
        className={cx(this.props.className, styles.input)}
        value={this.props.text}
        onChange={this.props.onChange}
        onKeyUp={(event) => {
          if (event.keyCode === 13) {
            this.props.onSubmit(this.props.text);
          }
        }}
      />
    );
  }
}
