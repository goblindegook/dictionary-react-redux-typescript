import * as cx from "classnames"
import * as React from "react"
import "react-dom"
import { IEntry } from "../api/Entry"
import { EntryListItem } from "./EntryListItem"

/* tslint:disable:no-var-requires */
const styles = require("./EntryList.style.scss")
/* tslint:enable:no-var-requires */

interface IEntryListProps extends React.Attributes {
  className?: string
  entries?: IEntry[]
}

/**
 * Render EntryList component.
 *
 * @param  {IEntryListProps} props Properties.
 * @return {JSX.Element}           Rendered EntryList component.
 */
export const EntryList = (props: IEntryListProps) => (
  <ul className={cx(props.className, styles.list)}>
    {props.entries && props.entries.map((entry) => (
      <EntryListItem entry={entry} key={entry.id} />
    ))}
  </ul>
)
