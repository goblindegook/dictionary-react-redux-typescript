import * as React from "react";
import * as ReactDOM from "react-dom";

import EntryList from "../components/EntryList";
import SearchInput from "../components/SearchInput";

interface IProps extends React.Props<Search> {}

export default class Search extends React.Component<IProps, any> {
  /**
   * Render search container.
   *
   * @return {any} Rendered search container.
   */
  public render(): any {
    return (
      <section className="search">
        <SearchInput />
        <EntryList />
      </section>
    );
  }
}
