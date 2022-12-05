import styles from "./Button.module.scss";
import { Link } from "react-router-dom";

const Button = ({
  onClick,
  className,
  children,
  fill,
  disabled,
  to,
  ...props
}) => {
  if (to) {
    return (
      <Link
        {...props}
        to={to}
        onClick={onClick}
        className={`${styles.btn} ${className ? className : ""} ${
          fill ? styles.fill : ""
        } ${disabled ? styles.disabled : ""}`}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      {...props}
      onClick={onClick}
      className={`${styles.btn} ${className} ${fill ? styles.fill : ""} ${
        disabled ? styles.disabled : ""
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
