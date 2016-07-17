import * as React from "react";
import "react-dom";
import * as cx from "classnames";
import { Link } from "react-router";
import { IEntry } from "../api/Entry";

/* tslint:disable:no-var-requires */
const styles = require("./EntryListItem.style.scss");
/* tslint:enable:no-var-requires */

export interface IEntryListItemProps extends React.ClassAttributes<EntryListItem> {
  className?: string;
  entry: IEntry;
}

export default class EntryListItem extends React.Component<IEntryListItemProps, {}> {
  /**
   * Render EntryListItem component.
   *
   * @return {JSX.Element} Rendered EntryListItem component.
   */
  public render() {
    const entry = this.props.entry;

    return (
      <li className={cx(this.props.className, styles.item)}>
        <Link
          className={cx(styles.link)}
          to={`/define/${entry.id}`}
        >
          {entry.word}
        </Link>
      </li>
    );
  }
}
