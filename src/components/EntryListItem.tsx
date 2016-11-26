import * as cx from "classnames"
import * as React from "react"
import "react-dom"
import { Link } from "react-router"
import { IEntry } from "../api/Entry"

/* tslint:disable:no-var-requires */
const styles = require("./EntryListItem.style.scss")
/* tslint:enable:no-var-requires */

interface IEntryListItemProps extends React.Attributes {
  className?: string
  entry: IEntry
}

/**
 * Render EntryListItem component.
 *
 * @param  {IEntryListItemProps} props Properties.
 * @return {JSX.Element}               Rendered EntryListItem component.
 */
export const EntryListItem = (props: IEntryListItemProps) => (
  <li className={cx(props.className, styles.item)}>
    <Link
      className={cx(styles.link)}
      to={`/define/${props.entry.id}`}
    >
      {props.entry.word}
    </Link>
  </li>
)
