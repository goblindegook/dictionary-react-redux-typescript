import * as React from "react";
import * as cx from "classnames";
import "react-dom";
import { IEntry } from "../api/Entry";

/* tslint:disable:no-var-requires */
const styles = require("./EntryDefinition.style.scss");
/* tslint:enable:no-var-requires */

/**
 * Safely transform strings only.
 */
function stringTransform(token: any, transform: (text: any) => (string | JSX.Element)[]) {
  return typeof token === "string" ? transform(token) : token;
}

/**
 * Formats a definition string, adding components where appropriate.
 *
 * @param  {String} text String to format.
 * @return {Array}       Array containing a mixture of strings and React elements.
 */
function componentizeText(text: string = ""): (string | JSX.Element)[] {
  return [text]
    // Replace line breaks:
    .reduce((all, token) => all.concat(stringTransform(token, t => t.split(/(<br\s*\/?>)/))), [])
    .map(token => token.match(/<br\s*\/?>/) ? <br /> : token)
    // Replace underlines:
    .reduce((all, token) => all.concat(stringTransform(token, t => t.split(/(_[^_]*_)/))), [])
    .map(token => stringTransform(token, t => t.match(/_.*_/) ? <em>{t.replace(/_/g, "")}</em> : t));
}

export interface IEntryDefinitionProps extends React.ClassAttributes<EntryDefinition> {
  className?: string;
  entry?: IEntry;
  title?: string;
}

export default class EntryDefinition extends React.Component<IEntryDefinitionProps, {}> {
  /**
   * Render EntryDefinition component.
   *
   * @return {JSX.Element} Rendered EntryDefinition component.
   */
  public render() {
    const entry = this.props.entry;

    if (!entry) {
      return (
        <article className={cx(this.props.className, styles.entry)}>
          <h2 className={cx(styles.title)}>
            <span className={cx("orth", styles.orth)}>{this.props.title}</span>
          </h2>
        </article>
      );
    }

    return (
      <article className={cx(this.props.className, styles.entry)}>
        <h2 className={cx(styles.title)}>
          <span className={cx("orth", styles.orth)}>{entry.spelling}</span>
          {entry.index && <sup className={cx("n", styles.n)}>{entry.index}</sup>}
          {entry.pronunciation && <span className={cx("pron", styles.pron)}>{entry.pronunciation}</span>}
        </h2>
        <ul className={cx("senses", styles.senses)}>
          {entry.senses.map((sense, index) => (
            <li className={cx("sense", styles.sense)} key={`${entry.id}:${index}`}>
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
        <p className={cx("etym", styles.etym)}>{componentizeText(entry.etymology)}</p>
      </article>
    );
  }
}
