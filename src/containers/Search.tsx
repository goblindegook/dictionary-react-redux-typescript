import * as React from "react";
import * as ReactDOM from "react-dom";
import { connect } from "react-redux";
import { createSelector } from "reselect";

import { IEntry } from "../api/Entry";
import { searchStart } from "../actions/search";
import EntryList from "../components/EntryList";
import LoadingIndicator from "../components/LoadingIndicator";
import NotFound from "../components/NotFound";
import SearchInput from "../components/SearchInput";

export interface ISearchProps extends React.Props<any> {
  entries?: IEntry[];
  isLoading?: Boolean;
  params?: {
    prefix?: string;
  };
  prefix?: string;
  onChange?: (event: Event) => void;
}

class Search extends React.Component<ISearchProps, {}> {
  /**
   * Render search container.
   *
   * @return {JSX.Element} Rendered search container.
   */
  public render() {
    let content: React.ReactElement<any> = undefined;

    if (this.props.prefix.trim().length > 0) {
      if (this.props.isLoading) {
        content = <LoadingIndicator />;
      } else if (this.props.entries.length === 0) {
        content = <NotFound />;
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
          text={this.props.prefix}
        />
        {content}
      </section>
    );
  }
}

export default connect(
  (state) => ({
    entries: state.search.entries,
    isLoading: state.search.isLoading,
    prefix: state.search.prefix,
  }),
  (dispatch) => ({
    onChange: (event) => dispatch(searchStart(event.target.value)),
  })
)(Search as React.ComponentClass<any>);
