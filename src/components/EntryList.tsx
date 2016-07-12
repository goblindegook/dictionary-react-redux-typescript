import * as React from "react";
import * as ReactDOM from "react-dom";
import EntryListItem from "./EntryListItem";
import { IDictionaryEntry } from "../api/Entry";

export interface IDictionaryEntryListProps extends React.Props<EntryList> {
  className?: string;
  entries: IDictionaryEntry[];
}

export default class EntryList extends React.Component<IDictionaryEntryListProps, {}> {
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
