import * as React from "react";
import "react-dom";
import * as Helmet from "react-helmet";
import { connect } from "react-redux";
import { definitionStart } from "../actions/definition";
import { definitionTask } from "../sagas/definition";
import { IEntry } from "../api/Entry";
import LoadingIndicator from "../components/LoadingIndicator";
import Error from "../components/Error";
import EntryDefinition from "../components/EntryDefinition";

interface IDefinitionProps extends React.ClassAttributes<Definition> {
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
   * @param  {Function} dispatch  Redux action dispatcher.
   * @param  {String}   params.id Entry ID.
   * @return {Array}              Saga workers and action objects.
   */
  public static preload({ id }) {
    return [
      [definitionTask, definitionStart(id)],
    ];
  }

  /**
   * Triggers onLoad property on mount.
   *
   * @return {void}
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
    let title: string;
    let content: JSX.Element | JSX.Element[] | string;

    if (this.props.isLoading) {
      title = "A carregar...";
      content = <LoadingIndicator />;

    } else if (this.props.error) {
      title = this.props.error.message;
      content = <Error message={this.props.error.message} />;

    } else if (!this.props.entries || !this.props.entries.length) {
      title = "Palavra não encontrada";
      content = <Error message="Palavra não encontrada" />;

    } else {
      title = this.props.id && this.props.id.replace(/:\d+$/, "");
      content = this.props.entries.map(entry => (
        <EntryDefinition key={entry.id} title={entry.word} entry={entry} />
      ));
    }

    return (
      <section className="definition">
        <Helmet title={title} />
        {content}
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
    onLoad: id => dispatch(definitionStart(id)),
  })
)(Definition as React.ComponentClass<any>);
