import * as React from "react";
import * as ReactDOM from "react-dom";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { IEntry } from "../api/Entry";
import { definitionStart } from "../actions/definition";
import LoadingIndicator from "../components/LoadingIndicator";
import Error from "../components/Error";
import EntryDefinition from "../components/EntryDefinition";

interface IDefinitionProps extends React.Props<Definition> {
  entry?: IEntry;
  error?: Error;
  isLoading?: Boolean;
  onLoad?: (id: string) => void;
  params?: {
    id?: string;
  };
}

class Definition extends React.Component<IDefinitionProps, {}> {
  /**
   * [componentWillMount description]
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
      return <LoadingIndicator />;
    }

    if (this.props.error) {
      return <Error message={this.props.error["message"]} />;
    }

    console.log(this.props.entry);

    return (
      <section className="definition">
        <EntryDefinition title={this.props.params && this.props.params.id} />
      </section>
    );
  }
}

export default connect(
  (state) => ({
    entry: state.definition.entry,
    error: state.definition.error,
    isLoading: state.definition.isLoading,
  }),
  (dispatch) => ({
    onLoad: (id) => dispatch(definitionStart(id)),
  })
)(Definition as React.ComponentClass<any>);
