import * as cx from "classnames"
import * as React from "react"
import "react-dom"

/* tslint:disable:no-var-requires */
const styles = require("./Header.style.scss")
/* tslint:enable:no-var-requires */

interface IHeaderProps extends React.Attributes {
  title: string
}

/**
 * Render header container.
 *
 * @return {JSX.Element} Rendered header container.
 */
export const Header = (props: IHeaderProps) => (
  <header className="header">
    <h1 className={cx(styles.title)}>
      {props.title}
    </h1>
  </header>
)
