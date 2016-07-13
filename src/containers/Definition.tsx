import * as React from "react";
import * as ReactDOM from "react-dom";
import { connect } from "react-redux";
import { resolve } from "react-resolver";
import { createSelector } from "reselect";
import { define } from "../api/DictionaryAPI";
import { IEntry } from "../api/Entry";
import { definitionStart } from "../actions/definition";
import LoadingIndicator from "../components/LoadingIndicator";
import Error from "../components/Error";
import EntryDefinition from "../components/EntryDefinition";

interface IDefinitionProps extends React.Props<Definition> {
  entries?: IEntry[];
  error?: Error;
  isLoading?: boolean;
  onLoad?: (id: string) => void;
  params?: {
    id?: string;
  };
}

@resolve("id", ({ location: { query }, params }) => params.id || query.id)
@resolve("entries", ({ id }) => define(id))
class Definition extends React.Component<IDefinitionProps, {}> {
  /**
   * [componentDidMount description]
   */
  public componentDidMount() {
    const id = this.props.params && this.props.params.id;

    if (id) {
      this.props.onLoad(id);
    }
  }

  /**
   * Render search container.
   *
   * @return {JSX.Element} Rendered search container.
   */
  public render() {
    let content: React.ReactElement<any> = undefined;

    if (this.props.isLoading) {
      return (<LoadingIndicator />);
    }

    if (this.props.error) {
      return (<Error message={this.props.error["message"]} />);
    }

    if (!this.props.entries) {
      return (<Error message="Not found" />);
    }

    return (
      <section className="definition">
        {this.props.entries.map((entry) => (
          <EntryDefinition key={entry.id} title={entry.word} entry={entry} />
        ))}
      </section>
    );
  }
}

export default connect(
  (state) => ({
    entries: state.definition.entries,
    error: state.definition.error,
    isLoading: state.definition.isLoading,
  }),
  (dispatch) => ({
    onLoad: (id) => dispatch(definitionStart(id)),
  })
)(Definition as React.ComponentClass<any>);
