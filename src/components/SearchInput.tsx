import * as React from "react";
import * as ReactDOM from "react-dom";

export interface ISearchInputProps extends React.Props<SearchInput> {
  className?: string;
  text?: string;
  onChange?(Event): void;
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
        type="text"
        className={this.props.className}
        value={this.props.text}
        onChange={this.props.onChange}
      />
    );
  }
}
