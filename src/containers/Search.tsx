import * as React from "react";
import * as ReactDOM from "react-dom";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { searchStart } from "../actions/search";
import { searchTask } from "../sagas/search";
import { IEntry } from "../api/Entry";
import { search } from "../api/DictionaryAPI";
import EntryList from "../components/EntryList";
import Error from "../components/Error";
import LoadingIndicator from "../components/LoadingIndicator";
import SearchInput from "../components/SearchInput";

export interface ISearchProps extends React.Props<any> {
  entries?: IEntry[];
  error?: Error;
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
   * @param  {Function} dispatch Redux action dispatcher.
   * @param  {string}   {prefix} Search term prefix.
   * @return {Array}             Saga workers and action objects.
   */
  public static preload(dispatch, { prefix }) {
    return [
      [searchTask, searchStart(prefix)],
    ];
  }

  /**
   * If set, fetch search results from `prefix` parameter on mount.
   */
  public componentWillMount() {
    this.props.onLoad(this.props.prefix);
  }

  /**
   * Render search container.
   *
   * @return {JSX.Element} Rendered search container.
   */
  public render() {
    const prefix = this.props.prefix || "";
    let content: React.ReactElement<any> = undefined;

    if (prefix.length > 0) {
      if (this.props.isLoading) {
        content = <LoadingIndicator />;
      } else if (this.props.error) {
        content = <Error message={this.props.error["message"]} />;
      } else if (!this.props.entries.length) {
        content = <Error message="Nothing found" />;
      } else {
        content = <EntryList entries={this.props.entries} />;
      }
    }

    return (
      <section className="search">
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
