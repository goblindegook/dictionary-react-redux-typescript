import * as React from "react";
import * as ReactDOM from "react-dom";

interface IProps extends React.Props<SearchInput> {
  className?: string;
  text?: string;
}

export default class SearchInput extends React.Component<IProps, any> {
  /**
   * Render application container.
   *
   * @return {any} Rendered application container.
   */
  public render(): any {
    return (
      <input
        type="text"
        className={this.props.className}
        value={this.props.text}
      />
    );
  }
}
