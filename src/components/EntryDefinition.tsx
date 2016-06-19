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
    return (
      <article className={this.props.className}>
        <h2>{this.props.title}</h2>
        <p>Definition of {this.props.title}</p>
      </article>
    );
  }
}
