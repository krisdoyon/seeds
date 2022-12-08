import styles from "./Form.module.scss";

export const Form = ({ onSubmit, className, children }) => {
  return (
    <form
      className={`${styles.wrapper} ${className ? className : ""}`}
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
};
