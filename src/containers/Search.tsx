import * as React from "react";
import * as ReactDOM from "react-dom";
import { connect } from "react-redux";
import { createSelector } from "reselect";

import { IEntry } from "../api/Entry";
import EntryList from "../components/EntryList";
import SearchInput from "../components/SearchInput";

export interface ISearchProps extends React.Props<Search> {
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
    entries: state.entries,
  }),
  (dispatch) => ({
    onChange: (event) => { console.log(event.target.value) },
    onClickEntry: (...args) => { console.log(args) },
  })
)(Search);
