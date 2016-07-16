import * as React from "react";
import "react-dom";
import { Link } from "react-router";
import { IEntry } from "../api/Entry";

export interface IEntryListItemProps extends React.Props<EntryListItem> {
  className?: string;
  entry: IEntry;
}

// TODO: Remove onClick handler, use router Link.

export default class EntryListItem extends React.Component<IEntryListItemProps, {}> {
  /**
   * Render EntryListItem component.
   *
   * @return {JSX.Element} Rendered EntryListItem component.
   */
  public render() {
    const entry = this.props.entry;

    return (
      <li className={this.props.className}>
        <Link to={`/define/${entry.id}`}>
          {entry.word}
        </Link>
      </li>
    );
  }
}
