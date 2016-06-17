import * as React from "react";
import * as ReactDOM from "react-dom";

import EntryListItem from "./EntryListItem";

export interface IEntryListProps extends React.Props<EntryList> {
  className?: string;
  entries?: Array<{
    id: number | string,
    name: string,
  }>;
  onClickEntry?(Event): void;
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
              name={entry.name}
              onClick={this.props.onClickEntry}
            />
          )
        )}
      </ul>
    );
  }
}
