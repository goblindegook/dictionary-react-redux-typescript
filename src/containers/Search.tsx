import * as React from "react";
import "react-dom";
import * as Helmet from "react-helmet";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { searchStart } from "../actions/search";
import { searchTask } from "../sagas/search";
import { IEntry } from "../api/Entry";
import EntryList from "../components/EntryList";
import Error from "../components/Error";
import LoadingIndicator from "../components/LoadingIndicator";
import SearchInput from "../components/SearchInput";

export interface ISearchProps extends React.Props<any> {
  entries?: IEntry[];
  error?: Error & { message: string };
  isLoading?: boolean;
  onChange: (event: React.FormEvent) => void;
  onLoad: (prefix: string) => void;
  onSubmit: (prefix: string) => void;
  params?: {
    prefix?: string;
  };
  prefix?: string;
}

class Search extends React.Component<ISearchProps, {}> {
  /**
   * Search results data preloaders.
   *
   * @param  {string} params.prefix Search term prefix.
   * @return {Array}                Saga workers and action objects.
   */
  public static preload({ prefix }) {
    return [
      [searchTask, searchStart(prefix)],
    ];
  }

  /**
   * If set, fetch search results from `prefix` parameter on mount.
   */
  public componentDidMount() {
    if (this.props.prefix) {
      this.props.onLoad(this.props.prefix);
    }
  }

  /**
   * Render search container.
   *
   * @return {JSX.Element} Rendered search container.
   */
  public render() {
    const prefix = this.props.prefix || "";
    let title: string = "Dicionário";
    let content: React.ReactElement<any>;

    if (prefix.length > 0) {
      if (this.props.isLoading) {
        title = "A pesquisar...";
        content = <LoadingIndicator />;

      } else if (this.props.error) {
        title = this.props.error.message;
        content = <Error message={this.props.error.message} />;

      } else if (!this.props.entries || !this.props.entries.length) {
        title = "Palavra não encontrada";
        content = <Error message="Palavra não encontrada" />;

      } else {
        title = `Pesquisa por ${prefix}`;
        content = <EntryList entries={this.props.entries} />;
      }
    }

    return (
      <section className="search">
        <Helmet title={title} />
        <SearchInput
          onChange={this.props.onChange}
          onSubmit={this.props.onSubmit}
          text={prefix}
        />
        {content}
      </section>
    );
  }
}

export default connect(
  (state, props: any) => ({
    entries: state.search.entries,
    error: state.search.error,
    isLoading: state.search.isLoading,
    prefix: state.search.prefix || props.params && props.params.prefix,
  }),
  (dispatch) => ({
    onChange: (event) => {
      const prefix = event.target.value;
      dispatch(searchStart(prefix));
      dispatch(push("/search/" + prefix));
    },
    onLoad: (prefix) => dispatch(searchStart(prefix)),
    onSubmit: (prefix) => dispatch(push("/search/" + prefix)),
  })
)(Search as React.ComponentClass<any>);
