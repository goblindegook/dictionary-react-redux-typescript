declare module "react-resolver" {
  import * as React from "react";

  interface IComponentDecorator<P, S> {
    (component: React.Component<P, S>): React.Component<P, S>;
  }

  function client(Loader: React.Component<any, any>): IComponentDecorator<any, any>;
  function context(name: string, type?: any): IComponentDecorator<any, any>;
  function resolve(prop: string, promise: (...args: any[]) => Promise<any>): any;

  type Resolver<P, T> = React.Component<P, T>;
}
