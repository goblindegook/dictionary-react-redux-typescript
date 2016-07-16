import * as React from "react";
import "react-dom";
import EntryListItem from "../EntryListItem";
import { IEntry } from "../../api/Entry";

// const style = require("./style.scss");

export interface IEntryListProps extends React.Props<EntryList> {
  className?: string;
  entries: IEntry[];
}

export default class EntryList extends React.Component<IEntryListProps, {}> {
  /**
   * Render EntryList component.
   *
   * @return {JSX.Element} Rendered EntryList component.
   */
  public render() {
    return (
      <ul className={this.props.className}>
        {this.props.entries && this.props.entries.map(
          (entry, index): React.ReactElement<EntryListItem> => (
            <EntryListItem
              key={entry.id}
              entry={entry}
            />
          )
        )}
      </ul>
    );
  }
}
