import * as React from "react";
import * as ReactDOM from "react-dom";

import { IEntry } from "../api/Entry";

export interface IEntryDefinitionProps extends React.Props<EntryDefinition> {
  className?: string;
  entry?: IEntry;
  n?: number;
  title?: string;
}

export default class EntryDefinition extends React.Component<IEntryDefinitionProps, {}> {
  /**
   * Render EntryDefinition component.
   *
   * @return {JSX.Element} Rendered EntryDefinition component.
   */
  public render() {
    const entry = this.props.entry && this.props.entry.content;
    const id: string = entry && entry["@id"];
    const n: string & number = (entry && entry["@n"]) || this.props.n || "";
    const orth: string = (entry && entry.form.orth) || this.props.title || "";
    const pron: string = entry && entry.form.pron;
    const senses: any[] = (entry && entry.sense) || [];

    return (
      <article className={this.props.className}>
        <h2>
          <span className="orth">{orth}</span>
          {n && <sup className="n">{n}</sup>}
          {pron && <span className="pron">{pron}</span>}
        </h2>
        <ul>
          {senses.map((sense, index) => (
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
