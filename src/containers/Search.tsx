import * as React from "react";
import * as ReactDOM from "react-dom";
import { connect } from "react-redux";
import { browserHistory } from "react-router";
import { resolve } from "react-resolver";
import { createSelector } from "reselect";
import { search } from "../api/DictionaryAPI";
import { IEntry } from "../api/Entry";
import { searchStart } from "../actions/search";
import EntryList from "../components/EntryList";
import LoadingIndicator from "../components/LoadingIndicator";
import Error from "../components/Error";
import SearchInput from "../components/SearchInput";

export interface ISearchProps extends React.Props<any> {
  entries?: IEntry[];
  error?: Error;
  isLoading?: boolean;
  params?: {
    prefix?: string;
  };
  prefix?: string;
  onChange?: (event: React.FormEvent) => void;
  onLoad?: (prefix: string) => void;
  onSubmit?: (prefix: string) => void;
}

@resolve("prefix", ({ location: { query }, params }) => params.prefix || query.prefix)
@resolve("entries", ({ prefix }) => search(prefix))
class Search extends React.Component<ISearchProps, {}> {
  /**
   * [componentDidMount description]
   */
  public componentDidMount() {
    const prefix = this.props.params && this.props.params.prefix;

    if (prefix) {
      this.props.onLoad(prefix);
    }
  }

  /**
   * Render search container.
   *
   * @return {JSX.Element} Rendered search container.
   */
  public render() {
    const prefixParam = this.props.params && this.props.params.prefix;
    const prefixProp = this.props.prefix;
    const prefix = prefixProp !== null ? prefixProp : prefixParam;

    let content: React.ReactElement<any> = undefined;

    if (prefix.trim().length > 0) {
      if (this.props.isLoading) {
        content = <LoadingIndicator />;
      } else if (this.props.error) {
        content = <Error message={this.props.error["message"]} />;
      } else if (this.props.entries.length === 0) {
        content = <Error message="Nothing found" />;
      } else {
        content = (
          <EntryList entries={this.props.entries} />
        );
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
  (state) => ({
    entries: state.search.entries,
    error: state.search.error,
    isLoading: state.search.isLoading,
    prefix: state.search.prefix,
  }),
  (dispatch) => ({
    onChange: (event) => dispatch(searchStart(event.target.value)),
    onLoad: (prefix) => dispatch(searchStart(prefix)),
    onSubmit: (prefix) => browserHistory.push("/search/" + prefix),
  })
)(Search as React.ComponentClass<any>);
