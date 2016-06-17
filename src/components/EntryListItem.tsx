import * as React from "react";
import * as ReactDOM from "react-dom";

interface IProps extends React.Props<EntryListItem> {
  className?: string;
  name?: string;
}

export default class EntryListItem extends React.Component<IProps, any> {
  /**
   * Render EntryListItem component.
   *
   * @return {any} Rendered EntryListItem component.
   */
  public render(): any {
    return (
      <li className={this.props.className}>{this.props.name}</li>
    );
  }
}
