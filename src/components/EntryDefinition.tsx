import * as React from "react";
import * as ReactDOM from "react-dom";

interface IProps extends React.Props<EntryDefinition> {
  className?: string;
}

export default class EntryDefinition extends React.Component<IProps, any> {
  /**
   * Render EntryDefinition component.
   *
   * @return {any} Rendered EntryDefinition component.
   */
  public render(): any {
    return (
      <article className={this.props.className}>
      </article>
    );
  }
}
