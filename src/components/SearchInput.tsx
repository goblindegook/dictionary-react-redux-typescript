import * as React from "react";
import * as cx from "classnames";
import LoadingIndicator from "./LoadingIndicator";
import "react-dom";

/* tslint:disable:no-var-requires */
const styles = require("./SearchInput.style.scss");
/* tslint:enable:no-var-requires */

interface ISearchInputProps extends React.Attributes {
  className?: string;
  isLoading?: boolean;
  placeholder?: string;
  text?: string;
  onChange?(event: React.FormEvent): void;
  onSubmit?(prefix: String): void;
}

/**
 * Render application container.
 *
 * @return {JSX.Element} Rendered application container.
 */
const SearchInput = (props: ISearchInputProps) => (
  <div className={cx(styles.container, props.className)}>
    <input
      autoFocus
      type="search"
      className={cx(styles.field, props.isLoading && styles.loading)}
      value={props.text}
      onChange={props.onChange}
      onKeyUp={(event) => {
        if (event.keyCode === 13) {
          props.onSubmit(props.text);
        }
      }}
      placeholder={props.placeholder}
    />
    {props.isLoading ? (
      <div className={styles.loaderContainer}>
        <LoadingIndicator className={styles.loader} />
      </div>
    ) : ""}
  </div>
);

export default SearchInput;
