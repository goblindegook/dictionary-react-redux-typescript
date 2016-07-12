import * as React from "react";
import * as ReactDOM from "react-dom";
import { Link } from "react-router";
import { IDictionaryEntry } from "../api/Entry";

export interface IDictionaryEntryListItemProps extends React.Props<EntryListItem> {
  className?: string;
  entry: IDictionaryEntry;
}

// TODO: Remove onClick handler, use router Link.

export default class EntryListItem extends React.Component<IDictionaryEntryListItemProps, {}> {
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
