import * as React from "react"
import "react-dom"
import * as Helmet from "react-helmet"
import { connect } from "react-redux"
import { push, PushAction } from "react-router-redux"
import { Action } from "redux-actions"
import { searchStart } from "../actions/search"
import { IEntry } from "../api/Entry"
import { EntryList } from "../components/EntryList"
import { SearchInput } from "../components/SearchInput"
import { Warning } from "../components/Warning"
import { IApplicationState } from "../reducers/index"
import { searchTask } from "../sagas/search"

interface ISearchProps extends React.ClassAttributes<any> {
  entries?: IEntry[]
  error?: Error & { message: string }
  isLoading?: boolean
  onChange?: (event: React.FormEvent<any>) => void
  onLoad?: (prefix: string) => void
  onSubmit?: (prefix: string) => void
  params?: {
    prefix?: string;
  }
  prefix?: string
}

interface ISearchPreloadParams {
  prefix?: string
}

class Search extends React.Component<ISearchProps, {}> {
  /**
   * Search results data preloaders.
   *
   * @param  {string} params.prefix Search term prefix.
   * @return {Array}                Saga workers and action objects.
   */
  public static preload({ prefix }: ISearchPreloadParams) {
    return [
      [searchTask, searchStart(prefix)],
    ]
  }

  /**
   * If set, fetch search results from `prefix` parameter on mount.
   */
  public componentDidMount() {
    if (this.props.onLoad && this.props.prefix) {
      this.props.onLoad(this.props.prefix)
    }
  }

  /**
   * Render search container.
   *
   * @return {JSX.Element} Rendered search container.
   */
  public render() {
    const prefixParam = (this.props.params && this.props.params.prefix) || ""
    const prefix =  this.props.prefix != null ? this.props.prefix : prefixParam
    let title: string = "Dicionário"
    let content: JSX.Element | JSX.Element[] | string | null = null

    if (prefix.length) {

      if (!this.props.isLoading) {
        if (this.props.error) {
          title = this.props.error.message
          content = <Warning message={this.props.error.message} />

        } else if (!this.props.entries || !this.props.entries.length) {
          title = "Palavra não encontrada"
          content = <Warning message="Palavra não encontrada" />
        }
      }

      if (!content) {
        title = `Pesquisa por ${prefix}`
        content = <EntryList entries={this.props.entries} />
      }
    }

    if (this.props.isLoading) {
      title = "A pesquisar..."
    }

    return (
      <section className="search">
        <Helmet title={title} />
        <SearchInput
          isLoading={!!prefix.length && this.props.isLoading}
          onChange={this.props.onChange}
          onSubmit={this.props.onSubmit}
          placeholder="Indique a palavra a pesquisar"
          text={prefix}
        />
        {content}
      </section>
    )
  }
}

export const ConnectedSearch = connect(
  (state: IApplicationState, ownProps: ISearchProps) => ({
    entries: state.search.entries,
    error: state.search.error,
    isLoading: state.search.isLoading,
    prefix: state.search.prefix != null ? state.search.prefix : ownProps.params && ownProps.params.prefix,
  }),
  (dispatch: Redux.Dispatch<Action<string> | PushAction>) => ({
    onChange: (event: React.FormEvent<any>) => dispatch(searchStart((event.target as any).value)),
    onLoad: (prefix: string) => dispatch(searchStart(prefix)),
    onSubmit: (prefix: string) => dispatch(push("/search/" + prefix)),
  }),
)(Search)
