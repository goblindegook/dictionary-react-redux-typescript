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
        <SearchInput
          onChange={(event) => console.log(event.target.value)}
        />
        <EntryList
          onClickEntry={(...args) => console.log(args)}
          entries={[{id: 1, name: "test1"}, {id: 2, name: "test2"}, {id: 3, name: "test3"}]}
        />
      </section>
    );
  }
}
