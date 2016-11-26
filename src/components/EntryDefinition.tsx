import * as cx from "classnames"
import * as React from "react"
import "react-dom"
import { IEntry } from "../api/Entry"

type DefinitionElement = string | string[] | JSX.Element | JSX.Element[]

/* tslint:disable:no-var-requires */
const styles = require("./EntryDefinition.style.scss")
/* tslint:enable:no-var-requires */

/**
 * Safely transform strings only.
 */
function stringTransform(token: DefinitionElement, transform: (text: string) => DefinitionElement): DefinitionElement {
  return typeof token === "string" ? transform(token) : token
}

/**
 * Formats a definition string, adding components where appropriate.
 *
 * @param  {String} text String to format.
 * @return {Array}       Array containing a mixture of strings and React elements.
 */
function componentizeText(text: string = ""): DefinitionElement[] {
  return [text]
    // Replace line breaks:
    .reduce((all: DefinitionElement[], token: string) =>
      all.concat(stringTransform(token, (t) => t.split(/(<br\s*\/?>)/))), [])
    .map((token: string) =>
      token.match(/<br\s*\/?>/) ? <br /> : token)
    // Replace underlines:
    .reduce((all: DefinitionElement[], token: string) =>
      all.concat(stringTransform(token, (t) => t.split(/(_[^_]*_)/))), [])
    .map((token: string) =>
      stringTransform(token, (t) => t.match(/_.*_/) ? <em>{t.replace(/_/g, "")}</em> : t))
}

interface IEntryDefinitionProps extends React.Attributes {
  className?: string
  entry?: IEntry
  title?: string
}

/**
 * Render EntryDefinition component.
 *
 * @param  {IEntryListProps} props Properties.
 * @return {JSX.Element}           Rendered EntryDefinition component.
 */
export const EntryDefinition = (props: IEntryDefinitionProps) => !props.entry ? (
  <article className={cx(props.className, styles.entry)}>
    <h2 className={cx(styles.title)}>
      <span className={cx("orth", styles.orth)}>{props.title}</span>
    </h2>
  </article>
) : (
  <article className={cx(props.className, styles.entry)}>
    <h2 className={cx(styles.title)}>
      <span className={cx("orth", styles.orth)}>{props.entry.spelling}</span>
      {props.entry.index > 0 && <sup className={cx("n", styles.n)}>{props.entry.index}</sup>}
      {props.entry.pronunciation && <span className={cx("pron", styles.pron)}>{props.entry.pronunciation}</span>}
    </h2>
    <ul className={cx("senses", styles.senses)}>
      {props.entry.senses.map((sense, index) => (
        <li className={cx("sense", styles.sense)} key={`${props.entry!.id}:${index}`}>
          <div className={cx("meta", styles.meta)}>
            {sense.grammarGroup && <span className={cx("gramGrp", styles.gramGrp)}>{sense.grammarGroup}</span>}
            {sense.usage && <span className={cx("usg", styles.usg)}>{sense.usage}</span>}
          </div>
          <p className={cx("def", styles.def)}>
            {componentizeText(sense.definition)}
          </p>
        </li>
      ))}
    </ul>
    <p className={cx("etym", styles.etym)}>{componentizeText(props.entry.etymology)}</p>
  </article>
)
