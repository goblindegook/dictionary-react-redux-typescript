import * as React from "react";
import * as ReactDOM from "react-dom";
import { connect } from "react-redux";
import { definitionStart } from "../actions/definition";
import { definitionTask } from "../sagas/definition";
import { define } from "../api/DictionaryAPI";
import { IEntry } from "../api/Entry";
import LoadingIndicator from "../components/LoadingIndicator";
import Error from "../components/Error";
import EntryDefinition from "../components/EntryDefinition";

interface IDefinitionProps extends React.Props<Definition> {
  entries?: IEntry[];
  error?: Error & { message: string };
  id?: string;
  isLoading?: boolean;
  onLoad?: (id: string) => void;
  params?: {
    id?: string;
  };
}

class Definition extends React.Component<IDefinitionProps, {}> {
  /**
   * Definition data preloaders.
   *
   * @param  {Function} dispatch Redux action dispatcher.
   * @param  {string}   {id}     Entry ID.
   * @return {Array}             Saga workers and action objects.
   */
  public static preload(dispatch, { id }) {
    return [
      [definitionTask, definitionStart(id)],
    ];
  }

  /**
   * Triggers onLoad property on
   */
  public componentDidMount() {
    if (this.props.id) {
      this.props.onLoad(this.props.id);
    }
  }

  /**
   * Render search container.
   *
   * @return {JSX.Element} Rendered search container.
   */
  public render() {
    if (this.props.isLoading) {
      return (<LoadingIndicator />);
    }

    if (this.props.error) {
      return (<Error message={this.props.error.message} />);
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
  (state, props: any) => ({
    entries: state.definition.entries,
    error: state.definition.error,
    id: state.definition.id || props.params && props.params.id,
    isLoading: state.definition.isLoading,
  }),
  (dispatch) => ({
    onLoad: (id) => dispatch(definitionStart(id)),
  })
)(Definition as React.ComponentClass<any>);
