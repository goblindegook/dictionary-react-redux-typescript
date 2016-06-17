import * as React from "react";
import * as ReactDOM from "react-dom";

export interface IEntryListItemProps extends React.Props<EntryListItem> {
  className?: string;
  name?: string;
}

export default class EntryListItem extends React.Component<IEntryListItemProps, {}> {
  /**
   * Render EntryListItem component.
   *
   * @return {JSX.Element} Rendered EntryListItem component.
   */
  public render() {
    return (
      <li className={this.props.className}>{this.props.name}</li>
    );
  }
}
