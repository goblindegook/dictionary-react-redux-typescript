import * as React from "react";
import * as ReactDOM from "react-dom";

import { IEntry } from "../api/Entry";

export interface IEntryDefinitionProps extends React.Props<EntryDefinition> {
  className?: string;
  entry?: IEntry;
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
      </article>
    );
  }
}
