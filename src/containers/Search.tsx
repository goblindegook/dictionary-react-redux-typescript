import * as React from "react";
import * as ReactDOM from "react-dom";
import { connect } from "react-redux";
import { createSelector } from "reselect";

import { IEntry } from "../api/Entry";
import EntryList from "../components/EntryList";
import SearchInput from "../components/SearchInput";
import searchThunk from "../thunks/search";

export interface ISearchProps extends React.Props<any> {
  entries?: IEntry[];
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
    return (
      <section className="search">
        <SearchInput
          onChange={this.props.onChange}
          text={this.props.params && this.props.params.prefix}
        />
        <EntryList
          entries={this.props.entries}
          onClickEntry={this.props.onClickEntry}
        />
      </section>
    );
  }
}

// TODO: Connect selectors, map to props, map to actions.

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
