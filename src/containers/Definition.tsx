import * as React from "react";
import * as ReactDOM from "react-dom";

import EntryDefinition from "../components/EntryDefinition";

interface IProps extends React.Props<Search> {}

export default class Search extends React.Component<IProps, any> {
  /**
   * Render search container.
   *
   * @return {any} Rendered search container.
   */
  public render(): any {
    return (
      <section className="definition">
        <EntryDefinition />
      </section>
    );
  }
}
