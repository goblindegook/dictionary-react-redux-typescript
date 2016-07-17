import * as React from "react";
import "react-dom";
import * as cx from "classnames";
import EntryListItem from "../EntryListItem";
import { IEntry } from "../../api/Entry";

/* tslint:disable:no-var-requires */
const styles = require("./style.scss");
/* tslint:enable:no-var-requires */

export interface IEntryListProps extends React.ClassAttributes<EntryList> {
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
      <ul className={cx(this.props.className, styles.list)}>
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
