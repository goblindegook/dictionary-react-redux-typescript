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
import searchThunk from "../thunks/search";

export interface ISearchProps extends React.Props<any> {
  entries?: IEntry[];
  isLoading?: Boolean;
  params?: {
    prefix?: string;
  };
  prefix?: string;
  onChange?: (event: Event) => void;
  onClickEntry?: (...args: any[]) => void;
}

class Search extends React.Component<ISearchProps, {}> {
  /**
   * Render search container.
   *
   * @return {JSX.Element} Rendered search container.
   */
  public render() {
    const isLoading = this.props.isLoading;
    let content;

    if (this.props.isLoading) {
      content = <LoadingIndicator />;
    } else if (this.props.entries.length === 0) {
      content = <NotFound />;
    } else {
      content = (
        <EntryList
          entries={this.props.entries}
          onClickEntry={this.props.onClickEntry}
        />
      );
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
    onChange: (event) => {
      // TODO: Debounce
      dispatch(searchThunk(event.target.value) as any as any);
    },
    onClickEntry: (...args) => {
      console.log(args); // TODO
    },
  })
)(Search as React.ComponentClass<any>);
