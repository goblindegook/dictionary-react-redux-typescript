import * as React from "react";
import * as ReactDOM from "react-dom";
import { connect } from "react-redux";
import { createSelector } from "reselect";

import { IEntry } from "../api/Entry";
import EntryDefinition from "../components/EntryDefinition";

interface IDefinitionProps extends React.Props<Definition> {
  entry?: IEntry;
  params?: {
    word?: string;
    index?: number;
  };
}

class Definition extends React.Component<IDefinitionProps, {}> {
  public componentWillMount() {
    // TODO: Fetch this.props.params.word
  }

  /**
   * Render search container.
   *
   * @return {JSX.Element} Rendered search container.
   */
  public render() {
    return (
      <section className="definition">
        <EntryDefinition title={this.props.params && this.props.params.word} />
      </section>
    );
  }
}

// TODO: Connect selectors, map to props, map to actions.

export default connect(
  state => ({}),
  dispatch => ({})
)(Definition);
