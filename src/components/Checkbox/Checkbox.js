import React from "react";
import styles from "./Checkbox.module.scss";

const Checkbox = (props) => {
  return (
    <label
      htmlFor={props.id}
      className={`${styles.container} ${props.className ? props.className : ""}`}
    >
      {props.label}
      <input
        id={props.id}
        name={props.name || props.id}
        type="checkbox"
        {...props}
      />
      <span className={styles.checkmark}></span>
    </label>
  );
};

export default Checkbox;
