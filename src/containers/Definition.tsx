import * as React from "react";
import * as ReactDOM from "react-dom";

import EntryDefinition from "../components/EntryDefinition";

interface IDefinitionProps extends React.Props<Search> {}

export default class Search extends React.Component<IDefinitionProps, {}> {
  /**
   * Render search container.
   *
   * @return {JSX.Element} Rendered search container.
   */
  public render() {
    return (
      <section className="definition">
        <EntryDefinition />
      </section>
    );
  }
}
