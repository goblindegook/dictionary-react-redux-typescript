import * as React from "react";
import * as ReactDOM from "react-dom";

import { IEntry } from "../api/Entry";

export interface IEntryDefinitionProps extends React.Props<EntryDefinition> {
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
        <article className={this.props.className}>
          <h2>
            <span className="orth">{this.props.title}</span>
          </h2>
        </article>
      );
    }

    return (
      <article className={this.props.className}>
        <h2>
          <span className="orth">{entry.spelling}</span>
          {entry.index && <sup className="n">{entry.index}</sup>}
          {entry.pronunciation && <span className="pron">{entry.pronunciation}</span>}
        </h2>
        <ul>
          {entry.senses.map((sense, index) => (
            <li className="sense" key={`${entry.id}:${index}`}>
              <div className="meta">
                <span className="gramGrp">{sense.grammarGroup}</span>
                {sense.usage && <span className="usg">{sense.usage}</span>}
              </div>
              <p className="def">{sense.definition}</p>
            </li>
          ))}
        </ul>
        <p className="etym">{entry.etymology}</p>
      </article>
    );
  }
}
