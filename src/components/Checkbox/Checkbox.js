import React from "react";
import styles from "./Checkbox.module.scss";

const Checkbox = (props) => {
  return (
    <div className={styles.row}>
      <label htmlFor={props.id} className={styles.container}>
        {props.label}
        <input
          id={props.id}
          name={props.name || props.id}
          type="checkbox"
          {...props}
        />
        <span className={styles.checkmark}></span>
      </label>
    </div>
  );
};

export default Checkbox;
