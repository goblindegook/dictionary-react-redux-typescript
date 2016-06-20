import * as React from "react";
import * as ReactDOM from "react-dom";
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import configureStore from "../store";
import Footer from "../components/Footer";
import Header from "../components/Header";

interface IAppProps extends React.Props<App> {
  children?: React.ReactNode;
}

const store = configureStore({
  entries: [{id: 1, name: "test1"}, {id: 2, name: "test2"}, {id: 3, name: "test3"}]
});

export default class App extends React.Component<IAppProps, {}> {
  /**
   * Render application container.
   *
   * @return {JSX.Element} Rendered application container.
   */
  public render() {
    return (
      <Provider store={store}>
        <div className="dictionary-app">
          <Header />
          {this.props.children}
          <Footer />
        </div>
      </Provider>
    );
  }
}
