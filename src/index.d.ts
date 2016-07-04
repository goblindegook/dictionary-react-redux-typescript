declare module "redux-mock-store" {
  import * as Redux from "redux";

  interface MockStore<S> extends Redux.Store<S> {
    dispatch(action: Object): any;
    getState(): S;
    getActions(): Object[];
    clearActions(): void;
    subscribe(listener: Function): () => void;
  }

  export default function configureStore(middlewares?: Redux.Middleware[]): MockStore<any>;
}
