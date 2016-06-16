import React = require("react");

interface IProps {
  text: string;
}

class App extends React.Component<IProps, {}> {
  /**
   * Render application container.
   *
   * @return {any} Rendered application container.
   */
  public render(): any {
    return (
      <div>{this.props.text}</div>
    );
  }
}

export default App;
