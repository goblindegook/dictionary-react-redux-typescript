import * as React from "react";
import * as ReactDOM from "react-dom";

import EntryListItem from "./EntryListItem";

interface IProps extends React.Props<EntryList> {
  className?: string;
  entries?: Array<string>;
}

export default class EntryList extends React.Component<IProps, any> {
  /**
   * Render EntryList component.
   *
   * @return {any} Rendered EntryList component.
   */
  public render(): any {
    return (
      <ul className={this.props.className}>
        {this.props.entries && this.props.entries.map(
          (entry: string): React.ReactElement<EntryListItem> => (
            <EntryListItem key={entry} name={entry} />
          )
        )}
      </ul>
    );
  }
}
