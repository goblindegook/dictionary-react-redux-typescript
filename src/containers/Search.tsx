import * as React from "react";
import * as ReactDOM from "react-dom";

import EntryList from "../components/EntryList";
import SearchInput from "../components/SearchInput";

export interface ISearchProps extends React.Props<Search> {}

export default class Search extends React.Component<ISearchProps, {}> {
  /**
   * Render search container.
   *
   * @return {JSX.Element} Rendered search container.
   */
  public render() {
    return (
      <section className="search">
        <SearchInput />
        <EntryList />
      </section>
    );
  }
}
