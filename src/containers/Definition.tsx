import * as React from "react"
import "react-dom"
import * as Helmet from "react-helmet"
import { connect } from "react-redux"
import { Action } from "redux-actions"
import { definitionStart } from "../actions/definition"
import { IEntry } from "../api/Entry"
import { EntryDefinition } from "../components/EntryDefinition"
import { LoadingIndicator } from "../components/LoadingIndicator"
import { Warning } from "../components/Warning"
import { IApplicationState } from "../reducers"
import { definitionTask } from "../sagas/definition"

interface IDefinitionProps extends React.ClassAttributes<Definition> {
  entries?: IEntry[]
  error?: Error & { message: string }
  id?: string
  isLoading?: boolean
  onLoad?: (id: string) => void
  params?: {
    id?: string;
  }
}

interface IDefinitionPreloadParams {
  id?: string
}

class Definition extends React.Component<IDefinitionProps, {}> {
  /**
   * Definition data preloaders.
   *
   * @param  {Function} dispatch  Redux action dispatcher.
   * @param  {String}   params.id Entry ID.
   * @return {Array}              Saga workers and action objects.
   */
  public static preload({ id }: IDefinitionPreloadParams) {
    return [
      [definitionTask, definitionStart(id)],
    ]
  }

  /**
   * Triggers onLoad property on mount.
   *
   * @return {void}
   */
  public componentDidMount() {
    if (this.props.onLoad && this.props.id) {
      this.props.onLoad(this.props.id)
    }
  }

  /**
   * Render search container.
   *
   * @return {JSX.Element} Rendered search container.
   */
  public render() {
    let title: string | undefined
    let content: JSX.Element | JSX.Element[] | string

    if (this.props.isLoading) {
      title = "A carregar..."
      content = <LoadingIndicator />

    } else if (this.props.error) {
      title = this.props.error.message
      content = <Warning message={this.props.error.message} />

    } else if (!this.props.entries || !this.props.entries.length) {
      title = "Palavra não encontrada"
      content = <Warning message="Palavra não encontrada" />

    } else {
      title = this.props.id && this.props.id.replace(/:\d+$/, "")
      content = this.props.entries.map((entry) => (
        <EntryDefinition key={entry.id} title={entry.word} entry={entry} />
      ))
    }

    return (
      <section className="definition">
        <Helmet title={title} />
        {content}
      </section>
    )
  }
}

export const ConnectedDefinition = connect(
  (state: IApplicationState, props: IDefinitionProps) => ({
    entries: state.definition.entries,
    error: state.definition.error,
    id: props.params && props.params.id,
    isLoading: state.definition.isLoading,
  }),
  (dispatch: Redux.Dispatch<Action<string>>) => ({
    onLoad: (id: string) => dispatch(definitionStart(id)),
  }),
)(Definition)
