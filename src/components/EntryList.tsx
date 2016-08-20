import * as React from "react";
import "react-dom";
import * as cx from "classnames";
import EntryListItem from "./EntryListItem";
import { IEntry } from "../api/Entry";

/* tslint:disable:no-var-requires */
const styles = require("./EntryList.style.scss");
/* tslint:enable:no-var-requires */

interface IEntryListProps extends React.Attributes {
  className?: string;
  entries: IEntry[];
}

/**
 * Render EntryList component.
 *
 * @param  {IEntryListProps} props Properties.
 * @return {JSX.Element}           Rendered EntryList component.
 */
const EntryList = (props: IEntryListProps) => (
  <ul className={cx(props.className, styles.list)}>
    {props.entries && props.entries.map(
      (entry, index) => (
        <EntryListItem entry={entry} key={entry.id} />
      )
    )}
  </ul>
);

export default EntryList;
