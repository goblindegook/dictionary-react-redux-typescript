import * as React from "react";
import * as ReactDOM from "react-dom";
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import EntryList from "../components/EntryList";
import SearchInput from "../components/SearchInput";

export interface ISearchProps extends React.Props<Search> {
  params?: {
    query?: string;
  };
  query?: string;
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
          onChange={(event) => console.log(event.target.value)}
          text={this.props.params && this.props.params.query}
        />
        <EntryList
          entries={[{id: 1, name: "test1"}, {id: 2, name: "test2"}, {id: 3, name: "test3"}]}
          onClickEntry={(...args) => console.log(args)}
        />
      </section>
    );
  }
}

// TODO: Connect selectors, map to props, map to actions.

export default connect(
  state => ({}),
  dispatch => ({})
)(Search);
