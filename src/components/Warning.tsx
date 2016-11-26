import * as React from "react"
import "react-dom"

interface IWarningProps extends React.Attributes {
  message?: string
}

/**
 * Render warning component.
 *
 * @return {JSX.Element} Rendered warning component.
 */
export const Warning = (props: IWarningProps) => (
  <div className="error">
    <div className="message">{props.message || "Erro"}</div>
  </div>
)
