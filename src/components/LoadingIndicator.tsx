import * as cx from "classnames"
import * as React from "react"
import "react-dom"

/* tslint:disable:no-var-requires */
const styles = require("./LoadingIndicator.style.scss")
/* tslint:enable:no-var-requires */

interface ILoadingIndicatorProps extends React.Attributes {
  className?: string
}

/**
 * Render footer container.
 *
 * @return {JSX.Element} Rendered footer container.
 */
export const LoadingIndicator = (props: ILoadingIndicatorProps) => (
  <div className={cx(styles.loader, props.className)}>A carregar...</div>
)
