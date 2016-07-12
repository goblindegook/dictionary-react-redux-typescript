import * as React from "react";
import * as ReactDOM from "react-dom";

import { IDictionaryEntry } from "../api/Entry";

export interface IDictionaryEntryDefinitionProps extends React.Props<EntryDefinition> {
  className?: string;
  entry?: IDictionaryEntry;
  title?: string;
}

export default class EntryDefinition extends React.Component<IDictionaryEntryDefinitionProps, {}> {
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

    const orth = entry.getOrthography();
    const n = entry.getIndex();
    const pron = entry.getPronunciation();
    const id = entry.getId();

    return (
      <article className={this.props.className}>
        <h2>
          <span className="orth">{orth}</span>
          {n && <sup className="n">{n}</sup>}
          {pron && <span className="pron">{pron}</span>}
        </h2>
        <ul>
          {entry.getSenses().map((sense, index) => (
            <li className="sense" key={`${id}:${index}`}>
              {sense.gramGrp && <div className="gramGrp">{sense.gramGrp}</div>}
              {sense.usg && sense.usg["#text"] && <div className="usg">{sense.usg["#text"]}</div>}
              <p className="def">{sense.def}</p>
            </li>
          ))}
        </ul>
      </article>
    );
  }
}
