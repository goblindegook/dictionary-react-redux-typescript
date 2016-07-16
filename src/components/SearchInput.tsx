import * as React from "react";
import "react-dom";

export interface ISearchInputProps extends React.Props<SearchInput> {
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
        className={this.props.className}
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
