import * as React from "react";
import * as ReactDOM from "react-dom";

export interface IEntryListItemProps extends React.Props<EntryListItem> {
  className?: string;
  name?: string;
  onClick?(Event): void;
}

export default class EntryListItem extends React.Component<IEntryListItemProps, {}> {
  /**
   * Render EntryListItem component.
   *
   * @return {JSX.Element} Rendered EntryListItem component.
   */
  public render() {
    return (
      <li className={this.props.className}>
        <a onClick={this.props.onClick && this.props.onClick.bind(this, this)}>
          {this.props.name}
        </a>
      </li>
    );
  }
}
