import * as cx from "classnames"
import * as React from "react"
import "react-dom"

/* tslint:disable:no-var-requires */
const styles = require("./Warning.style.scss")
/* tslint:enable:no-var-requires */

interface IWarningProps extends React.Attributes {
  message?: string
}

/**
 * Render warning component.
 *
 * @return {JSX.Element} Rendered warning component.
 */
export const Warning = (props: IWarningProps) => (
  <div className={cx("error", styles.error)}>
    <div className={cx("message", styles.message)}>
      {props.message || "Erro"}
    </div>
  </div>
)
